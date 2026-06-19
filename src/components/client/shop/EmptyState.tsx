// components/shop/EmptyState.tsx
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export const EmptyState = ({ onReset }: { onReset: () => void }) => {
  return (
    <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-dashed border-shop_light_green flex flex-col items-center gap-4">
      <SearchX className="h-16 w-16 text-shop_light_green/60" />
      <h3 className="text-xl font-semibold text-gray-800">No products found</h3>
      <p className="text-gray-500 max-w-md">
        Try adjusting your search or filter criteria. We have many amazing
        products waiting for you.
      </p>
      <Button
        onClick={onReset}
        className="rounded-xl bg-shop_light_green hover:bg-shop_dark_green text-white"
      >
        Reset Filters
      </Button>
    </div>
  );
};