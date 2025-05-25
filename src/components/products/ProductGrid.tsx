import { Search } from "lucide-react";
import React from "react";
import { classNames } from "../../utils/classNames";
import { ProductCard } from "./ProductCard";

const textPrimaryClass = "text-gray-800 dark:text-gray-100";
const textSecondaryClass = "text-gray-600 dark:text-gray-400";
const buttonBaseStyle = "px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors duration-150 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900";
const buttonOutlineVariantClass = "border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white focus:ring-orange-400";
const buttonGhostVariantClass = "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-gray-400";
const buttonPrimaryVariantClass = "bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-400";

interface ProductGridProps {
  products: any[];
  viewMode: "grid" | "list";
  clearFilters: () => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  viewMode,
  clearFilters
}) => {
  return (
    <>
      {products.length === 0 ? (
        <div className="p-12 text-center bg-white border border-gray-200 rounded-lg dark:bg-gray-800/50 dark:border-gray-700/50">
          <Search className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
          <h3 className={classNames("text-xl font-semibold mb-2", textPrimaryClass)}>Nenhum produto encontrado</h3>
          <p className={classNames("mb-6", textSecondaryClass)}>Tente ajustar os filtros ou limpar a busca.</p>
          <button
            onClick={clearFilters}
            className={classNames(buttonBaseStyle, buttonOutlineVariantClass)}
          >
            Limpar Filtros
          </button>
        </div>
      ) : (
        <>
          <div className={classNames("grid gap-5", viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-1")}>
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {products.length > 0 && (
            <div className="flex justify-center mt-10">
              <div className="flex items-center gap-2">
                <button className={classNames(buttonBaseStyle, buttonGhostVariantClass, textPrimaryClass, "disabled:opacity-50 px-4 py-2")} disabled>
                  Anterior
                </button>
                <button className={classNames(buttonBaseStyle, buttonPrimaryVariantClass, "w-10 h-10 p-0")}>
                  1
                </button>
                <button className={classNames(buttonBaseStyle, buttonGhostVariantClass, textPrimaryClass, "w-10 h-10 p-0")}>
                  2
                </button>
                <button className={classNames(buttonBaseStyle, buttonGhostVariantClass, textPrimaryClass, "px-4 py-2")}>
                  Próximo
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};