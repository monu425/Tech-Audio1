// components/shop/FilterSidebar.tsx
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Star } from "lucide-react";
import type { Filters } from "@/types/shop";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  resetFilters: () => void;
  categories: string[];
  onApply?: () => void;
}

export const FilterSidebar = ({ filters, setFilters, resetFilters, categories, onApply }: Props) => {
  const handleCategoryChange = (cat: string) => {
    setFilters({ ...filters, category: cat === filters.category ? "all" : cat });
  };

  return (
    <div className="space-y-6 bg-white p-6 rounded-3xl shadow-sm border border-green-50">
      <h3 className="text-lg font-semibold text-shop_dark_green">Filters</h3>

      {/* Categories */}
      <div>
        <h4 className="text-sm font-medium mb-2">Category</h4>
        <div className="space-y-2">
          <div
            className={`cursor-pointer px-3 py-1.5 rounded-xl text-sm transition ${
              filters.category === "all"
                ? "bg-shop_light_green text-white"
                : "bg-gray-50 hover:bg-shop_light_bg"
            }`}
            onClick={() => setFilters({ ...filters, category: "all" })}
          >
            All
          </div>
          {categories.map((cat) => (
            <div
              key={cat}
              className={`cursor-pointer px-3 py-1.5 rounded-xl text-sm transition ${
                filters.category === cat
                  ? "bg-shop_light_green text-white"
                  : "bg-gray-50 hover:bg-shop_light_bg"
              }`}
              onClick={() => handleCategoryChange(cat)}
            >
              {cat}
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-sm font-medium mb-2">Price Range</h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice || ""}
            onChange={(e) =>
              setFilters({ ...filters, minPrice: Number(e.target.value) || 0 })
            }
            className="w-full rounded-xl border border-shop_light_green px-3 py-1.5 text-sm"
          />
          <span className="text-gray-400">–</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice === 5000 ? "" : filters.maxPrice}
            onChange={(e) =>
              setFilters({ ...filters, maxPrice: Number(e.target.value) || 5000 })
            }
            className="w-full rounded-xl border border-shop_light_green px-3 py-1.5 text-sm"
          />
        </div>
      </div>

      {/* Rating */}
      <div>
        <h4 className="text-sm font-medium mb-2">Minimum Rating</h4>
        <div className="flex gap-1">
          {[4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() =>
                setFilters({
                  ...filters,
                  minRating: filters.minRating === star ? 0 : star,
                })
              }
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm transition ${
                filters.minRating === star
                  ? "bg-shop_light_pink text-shop_dark_blue"
                  : "bg-gray-50 hover:bg-shop_light_bg"
              }`}
            >
              {star} <Star className="h-3 w-3 fill-amber-400 text-amber-400" />+
            </button>
          ))}
        </div>
      </div>

      {/* Stock */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="inStock"
          checked={filters.inStockOnly}
          onCheckedChange={(checked) =>
            setFilters({ ...filters, inStockOnly: Boolean(checked) })
          }
          className="border-shop_light_green data-[state=checked]:bg-shop_light_green"
        />
        <Label htmlFor="inStock" className="text-sm cursor-pointer">
          In Stock Only
        </Label>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2 pt-2">
        <Button
          onClick={resetFilters}
          variant="outline"
          className="rounded-xl border-shop_light_green text-shop_dark_green hover:bg-shop_light_bg"
        >
          Clear All
        </Button>
        {onApply && (
          <Button
            onClick={onApply}
            className="rounded-xl bg-shop_light_green hover:bg-shop_dark_green text-white"
          >
            Apply Filters
          </Button>
        )}
      </div>
    </div>
  );
};