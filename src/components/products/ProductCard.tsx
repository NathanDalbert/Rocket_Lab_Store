// src/components/products/ProductCard.tsx
import { Heart, ShoppingCart, Star } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext'; // Ajuste o caminho para o NOVO CartContext
import { useToast } from '../../contexts/ToastContext';
import type { Product } from '../../types'; // Nosso tipo Product do projeto Vite

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // AJUSTE AQUI: Usando 'dispatch' do novo CartContext
  const { dispatch } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isProductInStock = product.stock === undefined || product.stock > 0;

    if (!isProductInStock) {
      showToast("Produto fora de estoque!", "error");
      return;
    }

    // AJUSTE AQUI: Despachando a ação ADD_ITEM com o produto e quantidade
    dispatch({ type: "ADD_ITEM", payload: { product, quantity: 1 } });
    showToast(`${product.name} adicionado ao carrinho!`, "success");
  };

  const renderStars = (rating: number = 0) => {
    const fullStars = Math.floor(rating);
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 transition-colors ${
          i < fullStars
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-300 dark:fill-gray-600 dark:text-gray-500"
        }`}
      />
    ));
  };

  const isProductInStock = product.stock === undefined || product.stock > 0;

  return (
    <div className="relative flex flex-col overflow-hidden transition-all duration-300 transform bg-white border border-gray-200 rounded-lg shadow-sm group dark:bg-gray-800 dark:border-gray-700/50 hover:shadow-xl hover:-translate-y-1">
      <Link to={`/product/${product.id}`} className="flex flex-col h-full rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            src={product.imageUrl || "https://via.placeholder.com/400x300/E0E0E0/BDBDBD?text=Sem+Imagem"}
            alt={product.name}
            className="absolute inset-0 object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          />

          {!isProductInStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60">
              <span className="bg-red-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md">Esgotado</span>
            </div>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const isCurrentlyFavorite = false; // Simulação, implemente a lógica de favoritos
              showToast(
                `${product.name} ${isCurrentlyFavorite ? 'removido dos' : 'adicionado aos'} favoritos! (simulação)`,
                "info"
              );
            }}
            className="absolute top-2.5 right-2.5 w-9 h-9 bg-white/80 dark:bg-gray-900/70 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-all duration-200 hover:bg-red-100 dark:hover:bg-red-700/30 group/fav focus:opacity-100"
            aria-label="Adicionar aos Favoritos"
          >
            <Heart className="w-4 h-4 text-gray-500 transition-colors dark:text-gray-400 group-hover/fav:text-red-500 group-hover/fav:fill-red-500" />
          </button>
        </div>

        <div className="flex flex-col flex-grow p-4">
          <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100 mb-1.5 line-clamp-2 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-tight">
            {product.name}
          </h3>

          {product.rating !== undefined && product.reviewCount !== undefined && product.rating > 0 && (
            <div className="flex items-center gap-1 mb-2 sm:mb-3">
              {renderStars(product.rating)}
              <span className="ml-1 text-xs text-gray-500 dark:text-gray-400">({product.reviewCount})</span>
            </div>
          )}

          <div className="mt-auto">
            <div className="mb-3">
              <span className="text-xl font-bold text-blue-600 sm:text-2xl dark:text-blue-400">
                R$ {product.price.toFixed(2).replace(".", ",")}
              </span>
              <div className="text-xs font-medium text-green-600 dark:text-green-400">
                em até 12x de R$ {(product.price / 12).toFixed(2).replace(".", ",")}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!isProductInStock}
              className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md font-semibold text-sm transition-colors duration-150 shadow-sm
                ${isProductInStock
                  ? "bg-orange-500 hover:bg-orange-600 text-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                }`}
              aria-label={isProductInStock ? `Adicionar ${product.name} ao carrinho` : `${product.name} está indisponível`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>{isProductInStock ? 'Adicionar' : 'Indisponível'}</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
};