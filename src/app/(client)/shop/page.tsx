// app/shop/page.tsx
"use client";

import { useState, useMemo } from "react";
import { ShopHero } from "@/components/client/shop/ShopHero";
import { ShopControls } from "@/components/client/shop/ShopControls";
import { FilterSidebar } from "@/components/client/shop/FilterSidebar";
import { ProductGrid } from "@/components/client/shop/ProductGrid";
import { EmptyState } from "@/components/client/shop/EmptyState";
import { PaginationSection } from "@/components/client/shop/PaginationSection";
import { PromotionalBanner } from "@/components/client/shop/PromotionalBanner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import { products, categories } from "@/data/products";
import type { Filters, SortOption } from "@/types/shop";
import Container from "@/components/commonFile/Container";

const ITEMS_PER_PAGE = 12;

export default function ShopPage() {
  const [filters, setFilters] = useState<Filters>({
    search: "",
    category: "all",
    minPrice: 0,
    maxPrice: 5000,
    minRating: 0,
    inStockOnly: false,
  });
  const [sort, setSort] = useState<SortOption>("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Filter logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    if (filters.category !== "all") {
      result = result.filter((p) => p.category === filters.category);
    }
    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );
    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }
    if (filters.inStockOnly) {
      result = result.filter((p) => p.stock !== "out-of-stock");
    }

    // Sort
    switch (sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return result;
  }, [filters, sort]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      minPrice: 0,
      maxPrice: 5000,
      minRating: 0,
      inStockOnly: false,
    });
    setCurrentPage(1);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-shop_light_bg">
      <Container>
        {/* Hero */}
      <ShopHero />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <ShopControls
          filters={filters}
          setFilters={setFilters}
          sort={sort}
          setSort={setSort}
          productCount={filteredProducts.length}
        />

        <div className="mt-8 flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              resetFilters={resetFilters}
              categories={categories}
            />
          </aside>

          {/* Mobile Filter Sheet */}
          <div className="lg:hidden mb-6">
            <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  className="gap-2 rounded-xl border-shop_light_green text-shop_dark_green"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80 p-6 overflow-y-auto">
                <FilterSidebar
                  filters={filters}
                  setFilters={setFilters}
                  resetFilters={resetFilters}
                  categories={categories}
                  onApply={() => setMobileFiltersOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>

          {/* Product Grid */}
          <div className="flex-1 min-w-0">
            {paginatedProducts.length > 0 ? (
              <>
                <ProductGrid products={paginatedProducts} />
                <PaginationSection
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </>
            ) : (
              <EmptyState onReset={resetFilters} />
            )}
          </div>
        </div>

        {/* Promo Banner */}
        <div className="mt-20">
          <PromotionalBanner />
        </div>
      </div>
      </Container>
    </main>
  );
}