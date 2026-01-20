import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import holyJalapeno from "@/assets/holy-jalapeno.jpeg";
import hornyHabanero from "@/assets/horny-habanero.jpeg";
import mrMild from "@/assets/mr-mild.jpeg";

interface OrderFormProps {
  onSuccess?: () => void;
}

interface Product {
  id: string;
  name: string;
  description: string;
  heat: string;
  image: string;
}

const products: Product[] = [
  {
    id: "mr-mild",
    name: "Mr. Mild",
    description: "A smooth and flavourful sauce with a gentle kick. Perfect for everyday meals and those who appreciate flavour over fire. This versatile condiment enhances your favourite dishes without overwhelming them. Crafted with carefully selected mild peppers, garlic, and herbs, Mr. Mild delivers a subtle warmth that builds gently on the palate. Ideal for those new to hot sauce or anyone seeking a balanced, everyday heat.",
    heat: "🌶️",
    image: mrMild
  },
  {
    id: "holy-jalapeno",
    name: "Holy Jalapeño",
    description: "A heavenly balance of heat and flavour from fresh jalapeños. Divine taste meets blessed heat in every drop. This celestial creation features hand-picked jalapeños combined with hints of lime and coriander, creating a bright, zesty profile that's simply divine. The medium heat level provides a satisfying kick that complements rather than dominates. Perfect for tacos, nachos, sandwiches, and anywhere you need a blessed burst of flavour.",
    heat: "🌶️🌶️",
    image: holyJalapeno
  },
  {
    id: "horny-habanero",
    name: "Horny Habanero",
    description: "Hot and fiery with the bold flavour of habaneros. Not for the faint of heart! This devil of a sauce brings serious heat. Featuring premium habanero peppers known for their intense heat and fruity undertones, this sauce delivers a passionate punch that'll make you sweat. The complex flavour profile balances the searing heat with hints of tropical fruit and a touch of sweetness. For those who crave extreme heat and aren't afraid to dance with the devil.",
    heat: "🌶️🌶️🌶️",
    image: hornyHabanero
  }
];

export function OrderForm({ onSuccess }: OrderFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
  });
  const [quantities, setQuantities] = useState<Record<string, number>>({
    "mr-mild": 0,
    "holy-jalapeno": 0,
    "horny-habanero": 0,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    if (formData.address.trim().length < 5) {
      newErrors.address = "Please enter a valid address";
    }
    
    const totalQuantity = Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
    if (totalQuantity === 0) {
      newErrors.products = "Please select at least one sauce";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleQuantityChange = (productId: string, value: string) => {
    const qty = parseInt(value) || 0;
    if (qty >= 0 && qty <= 100) {
      setQuantities({ ...quantities, [productId]: qty });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const orderedItems = products
        .filter(product => quantities[product.id] > 0)
        .map(product => `${quantities[product.id]} x ${product.name}`)
        .join(", ");

      console.log("Order submitted:", { ...formData, quantities });
      
      // Simulate order processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast({
        title: "Order Received!",
        description: `Thank you ${formData.firstName}! Your order for ${orderedItems} has been received.`,
      });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        address: "",
      });
      setQuantities({
        "mr-mild": 0,
        "holy-jalapeno": 0,
        "horny-habanero": 0,
      });
      setErrors({});
      
      onSuccess?.();
    } catch (error) {
      console.error("Order error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            className="bg-secondary border-border"
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-sm text-destructive">{errors.firstName}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            className="bg-secondary border-border"
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="text-sm text-destructive">{errors.lastName}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Delivery Address</Label>
        <Input
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="bg-secondary border-border"
          placeholder="123 Main St, City, State, ZIP"
        />
        {errors.address && (
          <p className="text-sm text-destructive">{errors.address}</p>
        )}
      </div>

      <div className="space-y-4">
        <Label className="text-base">Select Sauces & Quantities</Label>
        {errors.products && (
          <p className="text-sm text-destructive">{errors.products}</p>
        )}
        
        <div className="space-y-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-start gap-4 rounded-lg border border-border bg-secondary/50 p-4"
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="h-20 w-20 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold">{product.name}</h4>
                  <span className="text-lg">
                    {product.heat}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{product.description}</p>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                <Label htmlFor={`qty-${product.id}`} className="text-sm">
                  Qty:
                </Label>
                <Input
                  id={`qty-${product.id}`}
                  type="number"
                  value={quantities[product.id]}
                  onChange={(e) => handleQuantityChange(product.id, e.target.value)}
                  className="w-20 bg-background border-border"
                  min="0"
                  max="100"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Processing..." : "Place Order"}
      </Button>
    </form>
  );
}
