// components/shop/PromotionalBanner.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const PromotionalBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-shop_dark_green to-shop_light_green p-8 md:p-12 shadow-xl">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-white">
          <h2 className="text-2xl md:text-4xl font-bold">
            Experience Sound Like Never Before
          </h2>
          <p className="mt-2 text-white/80 max-w-md">
            Get up to 30% off on premium headphones and speakers. Limited time
            offer.
          </p>
          <Button className="mt-4 rounded-xl bg-white text-shop_dark_green hover:bg-shop_light_bg gap-2">
            Explore Deals <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
        <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center backdrop-blur">
          <span className="text-4xl">🎧</span>
        </div>
      </div>
    </section>
  );
};