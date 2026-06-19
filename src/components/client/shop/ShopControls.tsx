// components/shop/ShopControls.tsx
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import type { Filters, SortOption } from "@/types/shop";

interface Props {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  sort: SortOption;
  setSort: (val: SortOption) => void;
  productCount: number;
}

export const ShopControls = ({ filters, setFilters, sort, setSort, productCount }: Props) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search products..."
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="pl-10 rounded-xl border-shop_light_green focus-visible:ring-shop_light_green"
        />
      </div>
      <div className="flex items-center gap-4">
        <p className="text-sm text-gray-500 whitespace-nowrap">
          {productCount} product{productCount !== 1 ? "s" : ""}
        </p>
        <Select value={sort} onValueChange={(val) => setSort(val as SortOption)}>
          <SelectTrigger className="w-[160px] rounded-xl border-shop_light_green">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="price-asc">Price: Low → High</SelectItem>
            <SelectItem value="price-desc">Price: High → Low</SelectItem>
            <SelectItem value="rating">Rating</SelectItem>
            <SelectItem value="name">Name</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};