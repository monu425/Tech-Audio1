// components/shop/ProductGrid.tsx
import { ProductCard } from "./ProductCard";
import type { Product } from "@/types/shop";

export const ProductGrid = ({ products }: { products: Product[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};