import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductGrid } from "../components/products/ProductGrid";
import { SearchFiltersPanel } from "../components/search/SearchFiltersPanel";
import { SearchHeader } from "../components/search/SearchHeader";
import { PageContentSkeleton } from "../components/skeletons/SearchSkeleton";
import { mockProducts } from "../data/mockProducts";
import { useSearchFilters } from "../hooks/useSearchFilters";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFiltersPanel, setShowFiltersPanel] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const {
    filters,
    filteredProducts,
    updateFilter,
    handlePriceRangeChange,
    toggleBrand,
    clearFilters,
    availableBrands,
    availableCategories
  } = useSearchFilters(searchParams, mockProducts);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, [filters.query, filters.category, filters.sortBy]);

  if (isLoading) {
    return (
      <div className="container px-4 py-6 mx-auto">
        <PageContentSkeleton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
      <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
        <SearchHeader
          filters={filters}
          productCount={filteredProducts.length}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showFiltersPanel={showFiltersPanel}
          setShowFiltersPanel={setShowFiltersPanel}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <SearchFiltersPanel
            showFiltersPanel={showFiltersPanel}
            filters={filters}
            updateFilter={updateFilter as (key: string, value: any) => void}
            handlePriceRangeChange={handlePriceRangeChange}
            toggleBrand={toggleBrand}
            clearFilters={clearFilters}
            availableBrands={availableBrands}
            availableCategories={availableCategories}
          />

          <main className="lg:col-span-3">
            <ProductGrid 
              products={filteredProducts} 
              viewMode={viewMode} 
              clearFilters={clearFilters}
            />
          </main>
        </div>
      </div>
    </div>
  );
}
