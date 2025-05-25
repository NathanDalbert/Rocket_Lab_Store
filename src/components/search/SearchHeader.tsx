import { Filter, Grid3X3, List } from "lucide-react";
import { classNames } from "../../utils/classNames";

interface SearchHeaderProps {
  filters: {
    query: string;
  };
  productCount: number;
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
  showFiltersPanel: boolean;
  setShowFiltersPanel: (show: boolean) => void;
}

const textPrimaryClass = "text-gray-800 dark:text-gray-100";
const textSecondaryClass = "text-gray-600 dark:text-gray-400";

export const SearchHeader = ({
  filters,
  productCount,
  viewMode,
  setViewMode,
  showFiltersPanel,
  setShowFiltersPanel,
}: SearchHeaderProps) => {
  return (
    <div className="p-6 mb-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800/50 dark:border-gray-700/50">
      <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
     
        <div className="flex-1">
          <h1 className={classNames("text-2xl sm:text-3xl font-bold mb-1", textPrimaryClass)}>
            {filters.query ? `Resultados para "${filters.query}"` : "Nossos Produtos"}
          </h1>
          <p className={textSecondaryClass}>
            {productCount} produto(s) encontrado(s)
          </p>
        </div>

       
        <div className="flex items-center self-start gap-3 lg:self-center">
         
          <div className="flex items-center gap-1 overflow-hidden border border-gray-300 rounded-md dark:border-gray-600">
            <button
              onClick={() => setViewMode("grid")}
              className={classNames(
                "p-2 transition-colors focus:outline-none focus:ring-1 focus:ring-orange-500",
                viewMode === "grid" 
                  ? "bg-orange-500 text-white" 
                  : `${textPrimaryClass} hover:bg-gray-100 dark:hover:bg-gray-700`
              )}
              aria-label="Visualização em Grade"
            >
              <Grid3X3 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={classNames(
                "p-2 transition-colors focus:outline-none focus:ring-1 focus:ring-orange-500",
                viewMode === "list" 
                  ? "bg-orange-500 text-white" 
                  : `${textPrimaryClass} hover:bg-gray-100 dark:hover:bg-gray-700`
              )}
              aria-label="Visualização em Lista"
            >
              <List className="w-5 h-5" />
            </button>
          </div>

         
          <button
            onClick={() => setShowFiltersPanel(!showFiltersPanel)}
            className={classNames(
              "lg:hidden p-2 border border-gray-300 dark:border-gray-600 rounded-md",
              textPrimaryClass,
              "hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500"
            )}
            aria-label="Mostrar/Esconder Filtros"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};