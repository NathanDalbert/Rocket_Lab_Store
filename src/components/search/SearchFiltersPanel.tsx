import { Filter, Star } from "lucide-react";
import { classNames } from "../../utils/classNames";

interface SearchFiltersPanelProps {
  showFiltersPanel: boolean;
  filters: {
    sortBy: string;
    category: string;
    priceRange: [number, number];
    rating: number;
    brands: string[];
    inStock: boolean;
  };
  updateFilter: (key: string, value: any) => void;
  handlePriceRangeChange: (index: 0 | 1, value: string) => void;
  toggleBrand: (brand: string) => void;
  clearFilters: () => void;
  availableBrands: string[];
  availableCategories: { value: string; label: string }[];
}

const textPrimaryClass = "text-gray-800 dark:text-gray-100";
const textSecondaryClass = "text-gray-600 dark:text-gray-400";
const inputBaseClass = "block w-full px-3 py-2.5 bg-white dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500";

export const SearchFiltersPanel = ({
  showFiltersPanel,
  filters,
  updateFilter,
  handlePriceRangeChange,
  toggleBrand,
  clearFilters,
  availableBrands,
  availableCategories,
}: SearchFiltersPanelProps) => {
  const renderStarsDisplay = (rating: number = 0) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-500"}`}
      />
    ));
  };

  return (
    <aside className={classNames(
      "lg:col-span-1 lg:sticky lg:top-24 lg:self-start", 
      showFiltersPanel ? "block" : "hidden lg:block"
    )}>
      <div className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800/50 dark:border-gray-700/50">
      
        <div className={classNames(
          "p-4 font-semibold flex items-center justify-between border-b border-gray-200 dark:border-gray-700",
          textPrimaryClass
        )}>
          <div className="flex items-center">
            <Filter className="w-5 h-5 mr-2 text-orange-500" /> 
            Filtros
          </div>
          <button 
            onClick={clearFilters} 
            className="text-sm font-semibold text-orange-500 hover:text-orange-600"
          >
            Limpar Tudo
          </button>
        </div>

      
        <div className="p-4 space-y-5 max-h-[calc(100vh-12rem)] overflow-y-auto">
        
          <div>
            <label htmlFor="sortBy" className={classNames("block text-sm font-medium mb-1.5", textPrimaryClass)}>
              Ordenar por
            </label>
            <select
              id="sortBy"
              value={filters.sortBy}
              onChange={(e) => updateFilter("sortBy", e.target.value)}
              className={inputBaseClass}
            >
              <option value="relevance">Relevância</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="rating">Melhor Avaliados</option>
              <option value="reviews">Mais Vendidos</option>
              <option value="newest">Mais Recentes</option>
              <option value="name-asc">Nome (A-Z)</option>
              <option value="name-desc">Nome (Z-A)</option>
            </select>
          </div>

         
          <div>
            <label htmlFor="category" className={classNames("block text-sm font-medium mb-1.5", textPrimaryClass)}>
              Categoria
            </label>
            <select
              id="category"
              value={filters.category}
              onChange={(e) => updateFilter("category", e.target.value)}
              className={inputBaseClass}
            >
              {availableCategories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

         
          <div>
            <label className={classNames("block text-sm font-medium mb-1.5", textPrimaryClass)}>
              Faixa de Preço
            </label>
            <div className="flex items-center gap-2">
              <input
                aria-label="Preço mínimo"
                type="number"
                value={filters.priceRange[0]}
                onChange={(e) => handlePriceRangeChange(0, e.target.value)}
                className={classNames(inputBaseClass, "w-1/2")}
                placeholder="Mín"
                min="0"
              />
              <span className={textSecondaryClass}>-</span>
              <input
                aria-label="Preço máximo"
                type="number"
                value={filters.priceRange[1]}
                onChange={(e) => handlePriceRangeChange(1, e.target.value)}
                className={classNames(inputBaseClass, "w-1/2")}
                placeholder="Máx"
                min="0"
              />
            </div>
          </div>

        
          <div>
            <label className={classNames("block text-sm font-medium mb-1.5", textPrimaryClass)}>
              Avaliação Mínima
            </label>
            <div className="space-y-1">
              {[4, 3, 2, 1, 0].map((rating) => (
                <label
                  key={`rating-${rating}`}
                  className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 has-[:checked]:bg-orange-50 dark:has-[:checked]:bg-orange-900/30 has-[:checked]:border-orange-300 border border-transparent"
                >
                  <input
                    type="radio"
                    name="rating_filter"
                    value={rating}
                    checked={filters.rating === rating}
                    onChange={() => updateFilter("rating", rating)}
                    className="sr-only"
                  />
                  <div className="flex items-center justify-between w-full">
                    <div className="flex">{renderStarsDisplay(rating)}</div>
                    <span className={classNames("text-xs ml-2", textSecondaryClass)}>
                      {rating > 0 ? 'ou mais' : 'Todas'}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

        
          {availableBrands.length > 0 && (
            <div>
              <label className={classNames("block text-sm font-medium mb-1.5", textPrimaryClass)}>
                Marcas
              </label>
              <div className="p-2 pr-1 space-y-1 overflow-y-auto border border-gray-200 rounded-md max-h-36 dark:border-gray-700">
                {availableBrands.map((brand) => (
                  <label
                    key={brand}
                    className="flex items-center cursor-pointer p-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <input
                      type="checkbox"
                      checked={filters.brands.includes(brand)}
                      onChange={() => toggleBrand(brand)}
                      className="w-4 h-4 mr-2 text-orange-500 bg-white border-gray-300 rounded dark:border-gray-600 focus:ring-orange-500 focus:ring-offset-0 dark:bg-gray-700 checked:bg-orange-500 dark:checked:bg-orange-500"
                    />
                    <span className={classNames("text-sm", textPrimaryClass)}>
                      {brand}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          
          <div>
            <label className="flex items-center cursor-pointer p-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 mt-2">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => updateFilter("inStock", e.target.checked)}
                className="w-4 h-4 mr-2 text-orange-500 bg-white border-gray-300 rounded dark:border-gray-600 focus:ring-orange-500 focus:ring-offset-0 dark:bg-gray-700 checked:bg-orange-500 dark:checked:bg-orange-500"
              />
              <span className={classNames("text-sm", textPrimaryClass)}>
                Apenas em estoque
              </span>
            </label>
          </div>
        </div>
      </div>
    </aside>
  );
};