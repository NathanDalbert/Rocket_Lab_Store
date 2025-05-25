import { useEffect, useMemo, useState } from "react";
import type { SearchFilters, SortByType } from "../types";

export const useSearchFilters = (searchParams: URLSearchParams, products: any[]) => {
  const [filters, setFilters] = useState<SearchFilters>(() => ({
    query: searchParams.get("q") || "",
    category: searchParams.get("category") || "all",
    priceRange: [
      Number(searchParams.get("minPrice") || "0"),
      Number(searchParams.get("maxPrice") || "20000")
    ],
    rating: parseInt(searchParams.get("rating") || "0", 10),
    brands: searchParams.get("brands")?.split(",").filter(Boolean) || [],
    inStock: searchParams.get("inStock") === "true" || false,
    sortBy: (searchParams.get("sortBy") as SortByType) || "relevance",
  }));

  const availableBrands = useMemo(() => {
    const allBrands = new Set<string>();
    products.forEach(p => {
      if (p.brand) allBrands.add(p.brand);
    });
    return Array.from(allBrands).sort();
  }, [products]);

  const availableCategories = useMemo(() => [
    { value: "all", label: "Todas as Categorias" },
    ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))
      .map(cat => ({ value: cat as string, label: (cat as string).charAt(0).toUpperCase() + (cat as string).slice(1) }))
      .sort((a, b) => a.label.localeCompare(b.label))
  ], [products]);

  const filteredProducts = useMemo(() => {
    let currentProducts = [...products];
    const queryLower = filters.query.toLowerCase();

    if (filters.query) {
      currentProducts = currentProducts.filter(p =>
        p.name.toLowerCase().includes(queryLower) ||
        p.description.toLowerCase().includes(queryLower) ||
        p.tags?.some((tag: string) => tag.toLowerCase().includes(queryLower)) ||
        p.category?.toLowerCase().includes(queryLower) ||
        p.brand?.toLowerCase().includes(queryLower)
      );
    }
    if (filters.category && filters.category !== "all") {
      currentProducts = currentProducts.filter(p => p.category === filters.category);
    }
    currentProducts = currentProducts.filter(
      p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );
    if (filters.rating > 0) {
      currentProducts = currentProducts.filter(p => (p.rating || 0) >= filters.rating);
    }
    if (filters.brands.length > 0) {
      currentProducts = currentProducts.filter(p =>
        filters.brands.some(brandFilter =>
          p.brand?.toLowerCase() === brandFilter.toLowerCase()
        )
      );
    }
    if (filters.inStock) {
      currentProducts = currentProducts.filter(p => p.stock === undefined || (p.stock && p.stock > 0));
    }

    let sortableProducts = [...currentProducts];
    switch (filters.sortBy) {
      case "price-asc": sortableProducts.sort((a, b) => a.price - b.price); break;
      case "price-desc": sortableProducts.sort((a, b) => b.price - a.price); break;
      case "rating": sortableProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break;
      case "reviews": sortableProducts.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0)); break;
      case "newest": break;
      case "name-asc": sortableProducts.sort((a, b) => a.name.localeCompare(b.name)); break;
      case "name-desc": sortableProducts.sort((a, b) => b.name.localeCompare(a.name)); break;
      default: break;
    }
    return sortableProducts;
  }, [filters, products]);

  const handlePriceRangeChange = (index: 0 | 1, value: string) => {
    const newPrice = parseInt(value, 10);
    if (isNaN(newPrice) || newPrice < 0) return;

    const newRange = [...filters.priceRange] as [number, number];
    newRange[index] = newPrice;

    if (index === 0 && newRange[0] > newRange[1]) newRange[1] = newRange[0];
    if (index === 1 && newRange[1] < newRange[0]) newRange[0] = newRange[1];

    updateFilter("priceRange", newRange);
  };

  const updateFilter = <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleBrand = (brand: string) => {
    setFilters(prev => ({
      ...prev,
      brands: prev.brands.includes(brand) ? prev.brands.filter(b => b !== brand) : [...prev.brands, brand],
    }));
  };

  const clearFilters = () => {
    setFilters({
      query: "",
      category: "all",
      priceRange: [0, 20000],
      rating: 0,
      brands: [],
      inStock: false,
      sortBy: "relevance",
    });
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.query) params.set("q", filters.query);
    if (filters.category !== "all") params.set("category", filters.category);
    if (filters.priceRange[0] > 0) params.set("minPrice", String(filters.priceRange[0]));
    if (filters.priceRange[1] < 20000) params.set("maxPrice", String(filters.priceRange[1]));
    if (filters.rating > 0) params.set("rating", String(filters.rating));
    if (filters.brands.length > 0) params.set("brands", filters.brands.join(","));
    if (filters.inStock) params.set("inStock", "true");
    if (filters.sortBy !== "relevance") params.set("sortBy", filters.sortBy);

    const currentPath = window.location.pathname;
    const newSearch = params.toString();
    if (newSearch !== window.location.search.substring(1)) {
      window.history.replaceState({}, '', `${currentPath}?${newSearch}`);
    }
  }, [filters]);

  return {
    filters,
    filteredProducts,
    availableBrands,
    availableCategories,
    updateFilter,
    handlePriceRangeChange,
    toggleBrand,
    clearFilters
  };
};