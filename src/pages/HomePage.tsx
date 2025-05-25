import { CreditCard, Search, Shield, TrendingUp, Truck } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { ProductCard } from '../components/products/ProductCard';
import { ProductFilters } from '../components/products/ProductFilters';
import { mockProducts } from '../data/mockProducts';
import type { Product, ProductFiltersType } from '../types';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
}
const PageButton: React.FC<ButtonProps> = ({ className, children, variant, ...props }) => {
  let baseStyle = "px-6 py-2.5 rounded-lg font-semibold text-sm transition-colors duration-150 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900";
  if (variant === 'primary') {
    baseStyle += " bg-orange-500 hover:bg-orange-600 text-white focus:ring-orange-400";
  } else if (variant === 'outline') {
    baseStyle += " border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white focus:ring-orange-400";
  } else {
    baseStyle += " bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 focus:ring-gray-400";
  }
  return (
    <button className={`${baseStyle} ${className}`} {...props}>
      {children}
    </button>
  );
};


export const HomePage: React.FC = () => {
  const [filters, setFilters] = useState<ProductFiltersType>({
    category: "all",
    sortBy: "relevance",
    search: "", 
  });

  const [allProducts, setAllProducts] = useState<Product[]>([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    setLoading(true);
    setTimeout(() => {
    
      setAllProducts(mockProducts);
      setLoading(false);
    }, 300); 
  }, []); 


  const filteredAndSortedProducts = useMemo(() => {
    let processedProducts = [...allProducts]; 
   
    if (filters.search && filters.search.trim() !== "") {
      const searchTerm = filters.search.toLowerCase().trim();
      processedProducts = processedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category?.toLowerCase().includes(searchTerm) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    
    if (filters.category && filters.category !== "all") {
      processedProducts = processedProducts.filter(
        (product) => product.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

  
    switch (filters.sortBy) {
      case "price-asc":
        processedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        processedProducts.sort((a, b) => b.price - a.price);
        break;
      case "newest":
      
        processedProducts = [...processedProducts].reverse(); 
        break;
      case "bestsellers": 
        processedProducts.sort((a, b) => (b.reviewCount || 0) - (a.reviewCount || 0) || (b.rating || 0) - (a.rating || 0));
        break;
      case "name-asc":
        processedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        processedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "relevance":
      default:
     
        break;
    }

    return processedProducts;
  }, [allProducts, filters]); 

  if (loading) {
    return <div className="container px-4 py-20 mx-auto text-center text-gray-500 dark:text-gray-400">Carregando produtos...</div>;
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-950">
      <div className="container px-4 py-8 mx-auto sm:px-6 lg:px-8">
    
        <div className="relative p-8 mb-8 overflow-hidden text-white shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-gray-900 dark:from-slate-950 dark:via-slate-900 dark:to-black rounded-xl sm:p-12 sm:mb-10">
          <div className="absolute inset-0 bg-black bg-opacity-20 dark:bg-opacity-40"></div>
          <div className="relative z-10 max-w-xl sm:max-w-2xl">
            <h2 className="mb-4 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">Bem-vindo à RocketStore!</h2>
            <p className="mb-6 text-lg text-gray-200 sm:text-xl dark:text-gray-300">
              Descubra os melhores produtos com tecnologia de ponta e qualidade excepcional.
            </p>
            <PageButton variant="primary" className="px-8 py-3 text-base sm:text-lg">
              <TrendingUp className="w-5 h-5 mr-2" />
              Confira as Novidades!
            </PageButton>
          </div>
          <div className="absolute w-1/2 rounded-full opacity-50 -bottom-1/4 -right-1/4 h-1/2 bg-orange-500/10 blur-3xl animate-pulse"></div>
        </div>

       
        <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 sm:mb-10">
          {[
            { icon: Truck, title: "Frete Grátis", desc: "Em compras acima de R$ 99" },
            { icon: Shield, title: "Compra Segura", desc: "Seus dados protegidos" },
            { icon: CreditCard, title: "12x sem juros", desc: "No cartão de crédito" },
            { icon: TrendingUp, title: "Melhor Preço", desc: "Garantia de preço baixo" },
          ].map((benefit, index) => (
            <div
              key={index}
              className="p-4 text-center transition-all duration-300 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 sm:p-5 dark:border-gray-700/50 hover:shadow-xl hover:border-orange-300 dark:hover:border-orange-500/50 hover:scale-105"
            >
              <benefit.icon className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500 mx-auto mb-2.5" />
              <h3 className="mb-1 text-sm font-semibold text-gray-800 sm:text-base dark:text-gray-100">{benefit.title}</h3>
              <p className="text-xs text-gray-600 sm:text-sm dark:text-gray-400">{benefit.desc}</p>
            </div>
          ))}
        </div>

        
        <ProductFilters filters={filters} onFiltersChange={setFilters} />

        
        <div className="mb-6">
          <h2 className="mb-1 text-2xl font-bold text-gray-800 sm:text-3xl dark:text-gray-100 sm:mb-2">Nossos Produtos</h2>
          <div className="flex flex-col items-start justify-between text-xs sm:flex-row sm:items-center sm:text-sm">
            <p className="mb-1 text-gray-600 dark:text-gray-400 sm:mb-0">
              {filteredAndSortedProducts.length} produto(s) encontrado(s)
            </p>
            <div className="text-gray-500 dark:text-gray-400">
              Ordenado por:{" "}
              <span className="font-semibold text-orange-600 dark:text-orange-400">
                {filters.sortBy === "relevance" && "Relevância"}
                {filters.sortBy === "bestsellers" && "Mais Vendidos"}
                {filters.sortBy === "price-asc" && "Menor Preço"}
                {filters.sortBy === "price-desc" && "Maior Preço"}
                {filters.sortBy === "newest" && "Mais Recentes"}
                {filters.sortBy === "name-asc" && "Nome: A-Z"}
                {filters.sortBy === "name-desc" && "Nome: Z-A"}
              </span>
            </div>
          </div>
        </div>

       
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 sm:gap-6">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
         
          <div className="py-12 text-center transition-colors duration-300 bg-white border border-gray-200 rounded-lg shadow sm:py-16 dark:bg-gray-800/50 dark:border-gray-700/50">
            <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full sm:w-24 sm:h-24 dark:bg-gray-700">
              <Search className="w-10 h-10 text-gray-400 sm:w-12 sm:h-12 dark:text-gray-500" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-gray-800 sm:text-xl dark:text-gray-100">Nenhum produto encontrado</h3>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">Tente ajustar os filtros ou limpar a busca.</p>
            <PageButton
              variant="outline"
              onClick={() => setFilters({ category: "all", sortBy: "relevance", search: "" })}
            >
              Limpar Filtros
            </PageButton>
          </div>
        )}
      </div>
    </div>
  );
};