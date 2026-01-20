import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { OrderForm } from "@/components/OrderForm";
import lsLogo from "@/assets/ls-logo.jpeg";
import holyJalapeno from "@/assets/holy-jalapeno.jpeg";
import hornyHabanero from "@/assets/horny-habanero.jpeg";
import mrMild from "@/assets/mr-mild.jpeg";

const Index = () => {
  const [isOrderDialogOpen, setIsOrderDialogOpen] = useState(false);

  const products = [
    {
      name: "Mr. Mild",
      image: mrMild,
      description: "Cool, smooth, and flavourful",
      heat: "Mild",
    },
    {
      name: "Holy Jalapeño",
      image: holyJalapeno,
      description: "Divine flavour with a heavenly kick",
      heat: "Medium",
    },
    {
      name: "Horny Habanero",
      image: hornyHabanero,
      description: "Sinfully spicy, wickedly delicious",
      heat: "Extra Hot",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative flex min-h-screen flex-col items-center justify-center px-4 py-20">
        <div className="absolute inset-0 bg-gradient-radial from-primary/5 via-transparent to-transparent opacity-50" />

        <div className="relative z-10 flex flex-col items-center space-y-8 text-center">
          <div className="animate-fade-in-up">
            <img
              src={lsLogo}
              alt="Lee's Sauce - Handcrafted Heat Since 2017"
              className="mx-auto h-auto w-full max-w-md drop-shadow-2xl transition-transform duration-500 hover:scale-105"
            />
          </div>

          <div className="animate-fade-in-up space-y-4 animation-delay-200">
            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Handcrafted Heat
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground sm:text-2xl">
              Premium small-batch hot sauces crafted with passion since 2017
            </p>
          </div>

          <div className="animate-fade-in-up flex flex-wrap gap-4 animation-delay-400">
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => setIsOrderDialogOpen(true)}
            >
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary text-foreground hover:bg-primary/10 font-semibold"
              onClick={() => {
                document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Our Sauces
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              Three distinct flavours, each with its own personality
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {products.map((product, index) => (
              <Card
                key={product.name}
                className="group relative overflow-hidden border-border bg-card transition-all duration-500 hover:border-primary hover:shadow-2xl hover:shadow-primary/20 animate-fade-in-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-transparent">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="mb-2 text-2xl font-bold">{product.name}</h3>
                  <p className="mb-3 text-muted-foreground">{product.description}</p>
                  <div className="inline-flex items-center rounded-full border border-primary/50 bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
                    {product.heat}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative border-t border-border px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
            Crafted with Care
          </h2>
          <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
            Since 2017, Lee's Sauce has been creating exceptional hot sauces using only the finest ingredients.
            Each batch is carefully crafted to deliver bold flavours and the perfect amount of heat.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            From the divine Holy Jalapeño to the devilishly hot Horny Habanero, and the smooth Mr. Mild,
            we have a sauce for every palate and every occasion.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-transparent to-transparent p-12 shadow-2xl">
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Ready to Turn Up the Heat?
            </h2>
            <p className="mb-8 text-lg text-muted-foreground">
              Experience the bold flavours of Lee's Sauce today
            </p>
            <Button
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-lg px-8 py-6"
              onClick={() => setIsOrderDialogOpen(true)}
            >
              Order Now
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-8 text-center">
        <p className="text-sm text-muted-foreground">
          © 2017-2025 Lee's Sauce. All rights reserved. | Handcrafted Heat Since 2017
        </p>
      </footer>

      {/* Order Dialog */}
      <Dialog open={isOrderDialogOpen} onOpenChange={setIsOrderDialogOpen}>
        <DialogContent
          className="bg-card border-border sm:max-w-[500px] max-h-[85vh] overflow-y-auto overscroll-contain"
        >
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Place Your Order</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Fill in your details below to order Lee&apos;s Sauce
            </DialogDescription>
          </DialogHeader>

          <OrderForm onSuccess={() => setIsOrderDialogOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
