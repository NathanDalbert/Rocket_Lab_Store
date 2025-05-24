// src/components/products/ProductFilters.tsx
import { Filter, SortAsc } from 'lucide-react';
import React from 'react';
import type { ProductFiltersType } from '../../types';

interface ProductFiltersProps {
  filters: ProductFiltersType;
  onFiltersChange: (newFilters: ProductFiltersType) => void;
}

const categories = [
  { value: "all", label: "Todas as categorias" },
  { value: "electronics", label: "Eletrônicos" }, 
  { value: "apparel", label: "Vestuário" },      // Ex: 'Apparel' para GalaxyExplorer Suit
  { value: "equipment", label: "Equipamentos" }, // Ex: 'Equipment' para SatLink Communicator
  { value: "personal rockets", label: "Foguetes Pessoais" }, // Ex: 'Personal Rockets' para AstroRocket

    { value: "clothing", label: "Roupas" },
    { value: "books", label: "Livros" },
   { value: "home", label: "Casa e Jardim" },
 { value: "sports", label: "Esportes" },
];

const sortOptions = [
  { value: "relevance", label: "Relevância" },
  { value: "bestsellers", label: "Mais Vendidos (simulado)" }, // Simulado, pois não temos dados de vendas
  { value: "price-asc", label: "Preço: Menor para Maior" },
  { value: "price-desc", label: "Preço: Maior para Menor" },
  { value: "newest", label: "Mais Recentes (simulado)" }, // Simulado, pois não temos data de adição
  { value: "name-asc", label: "Nome: A-Z" },
  { value: "name-desc", label: "Nome: Z-A" },
];

// Componente Label simples
const FilterLabel: React.FC<React.LabelHTMLAttributes<HTMLLabelElement> & { icon?: React.ElementType }> = ({ icon: Icon, children, className, ...props }) => (
  <label className={`block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 flex items-center ${className}`} {...props}>
    {Icon && <Icon className="w-4 h-4 mr-1.5 text-orange-500" />}
    {children}
  </label>
);

// Componente Select simplificado
interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
}
const SimpleSelect: React.FC<SelectProps> = ({ options, className, placeholder, value, ...props }) => (
  <select
    value={value || ""} // Garante que um valor esteja selecionado para o placeholder funcionar em alguns casos
    className={`block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700/50 
                rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 
                sm:text-sm text-gray-900 dark:text-gray-50 ${className} ${!value || value === "all" || value === "relevance" ? 'text-gray-500 dark:text-gray-400' : ''}`}
    {...props}
  >
    {placeholder && <option value="" disabled hidden>{placeholder}</option>}
    {options.map(option => (
      <option key={option.value} value={option.value} className="text-gray-900 dark:text-gray-50">
        {option.label}
      </option>
    ))}
  </select>
);


export const ProductFilters: React.FC<ProductFiltersProps> = ({ filters, onFiltersChange }) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, category: e.target.value });
  };

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFiltersChange({ ...filters, sortBy: e.target.value as ProductFiltersType["sortBy"] });
  };

  return (
    <div className="mb-6 overflow-hidden bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800/50 dark:border-gray-700/50 sm:mb-8">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700/50">
        <h2 className="flex items-center text-lg font-semibold text-gray-700 dark:text-gray-200">
          <Filter className="w-5 h-5 mr-3 text-orange-500" />
          Filtros e Ordenação
        </h2>
      </div>

      <div className="p-4 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
          <div className="flex-1">
            <FilterLabel htmlFor="category-select" icon={Filter}>Categoria</FilterLabel>
            <SimpleSelect
              id="category-select"
              options={categories}
              value={filters.category}
              onChange={handleCategoryChange}
            
            />
          </div>

          <div className="flex-1">
            <FilterLabel htmlFor="sort-select" icon={SortAsc}>Ordenar por</FilterLabel>
            <SimpleSelect
              id="sort-select"
              options={sortOptions}
              value={filters.sortBy}
              onChange={handleSortByChange}
              // placeholder="Selecione uma opção de ordenação"
            />
          </div>
        </div>
      </div>
    </div>
  );
};