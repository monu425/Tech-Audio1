// components/shop/ProductCard.tsx (agar nahi hai to yeh bana lo)
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/shop";

export const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {product.stock === "out-of-stock" && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            Out of Stock
          </span>
        )}
        <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition">
          <Heart className="h-4 w-4 text-gray-700" />
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-shop_light_green font-medium">{product.category}</p>
        <h3 className="mt-1 font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
        <div className="flex items-center gap-1 mt-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < product.rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-lg font-bold text-shop_dark_green">
            ₹{product.price.toLocaleString()}
          </span>
          <Button
            size="sm"
            className="rounded-xl bg-shop_light_green hover:bg-shop_dark_green text-white gap-1"
            disabled={product.stock === "out-of-stock"}
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};