// src/components/Navbar.tsx
import { Menu, Search, ShoppingCart } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import logoSrc from '../../imagens/Logo.png';
import { classNames } from '../../utils/classNames';
import ThemeToggle from '../common/ThemeToggle';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onFocus?: () => void;
  onBlur?: () => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ className, ...props }) => (
  <input
    className={`w-full pl-4 pr-12 py-2.5 border-2 border-gray-700 dark:border-gray-600 bg-gray-700/50 dark:bg-gray-800/60 text-white rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all placeholder-gray-400 dark:placeholder-gray-500 text-sm ${className}`}
    {...props}
  />
);

export const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [, setIsSearchFocused] = useState(false);
  const { state } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

 
  useEffect(() => {
    if (location.pathname === '/search') {
      const searchParams = new URLSearchParams(location.search);
      const query = searchParams.get('q') || "";
      setSearchQuery(query);
    } else {
      setSearchQuery("");
    }
  }, [location]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileMenuOpen(false); // Fecha o menu mobile após busca
    }
  };

  const itemCount = state.itemCount;

  return (
    <header className="sticky top-0 z-50 text-white bg-gray-800 border-b border-gray-700 shadow-lg dark:bg-gray-900 dark:border-gray-800">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        {/* Desktop Navbar */}
        <div className="flex items-center justify-between h-16 gap-2 sm:gap-4 sm:h-20">
          {/* Logo e Menu Mobile */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-gray-300 lg:hidden hover:text-white focus:outline-none"
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <Link to="/" className="flex-shrink-0" aria-label="Página Inicial">
              <div className="flex items-center gap-2">
                <div className="w-auto h-14 sm:h-16">
                  <img
                    src={logoSrc}
                    alt="Logo"
                    className="object-contain w-auto h-full" 
                  />
                </div>
              </div>
            </Link>
          </div>

         
          <form 
            onSubmit={handleSearch} 
            className={classNames(
              "flex-1 max-w-xs mx-2 sm:max-w-sm md:max-w-md lg:max-w-xl sm:mx-4",
              "hidden lg:block"
            )}
          >
            <div className="relative">
              <SearchInput
                type="search"
                placeholder="Buscar produtos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Barra de busca de produtos"
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              <button
                type="submit"
                className={classNames(
                  "absolute right-0.5 top-0.5 bottom-0.5 px-3 sm:px-4 rounded-md",
                  "bg-orange-500 hover:bg-orange-600 text-white",
                  "focus:outline-none focus:ring-2 focus:ring-orange-400",
                  "focus:ring-offset-1 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900",
                  "transition-colors"
                )}
                aria-label="Realizar busca"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </form>

         
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link 
              to="/cart" 
              className={classNames(
                "relative flex-shrink-0 p-2 rounded-full",
                "text-gray-300 hover:text-white hover:bg-gray-700 dark:hover:bg-gray-600",
                "focus:outline-none focus:ring-2 focus:ring-orange-500",
                "focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900",
                "transition-colors"
              )}
              aria-label={`Carrinho com ${itemCount} itens`}
            >
              <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
              {itemCount > 0 && (
                <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-orange-500 rounded-full shadow-sm -top-1 -right-1 sm:w-6 sm:h-6 animate-bounce">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

     
        {isMobileMenuOpen && (
          <div className="pb-4 lg:hidden">
           
            <form onSubmit={handleSearch} className="mt-3">
              <div className="relative">
                <SearchInput
                  type="search"
                  placeholder="Buscar produtos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Barra de busca mobile"
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <button
                  type="submit"
                  className={classNames(
                    "absolute right-0.5 top-0.5 bottom-0.5 px-3 rounded-md",
                    "bg-orange-500 hover:bg-orange-600 text-white",
                    "focus:outline-none focus:ring-2 focus:ring-orange-400",
                    "transition-colors"
                  )}
                  aria-label="Buscar"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="flex flex-col mt-4 space-y-2">
              <Link 
                to="/categories" 
                className="px-3 py-2 text-gray-300 rounded-md hover:text-white hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categorias
              </Link>
              <Link 
                to="/offers" 
                className="px-3 py-2 text-gray-300 rounded-md hover:text-white hover:bg-gray-700"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Ofertas
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};