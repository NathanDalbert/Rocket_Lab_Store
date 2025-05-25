import { Minus, Plus, Trash2 } from 'lucide-react';
import React from 'react';
import { useCart } from '../../contexts/CartContext';
import type { CartItem as CartItemType } from '../../types';
import { Button } from '../common/Button';

interface CartItemProps {
  item: CartItemType;
}

export const CartItemCard: React.FC<CartItemProps> = ({ item }) => {
  
  const { dispatch } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
    
      dispatch({ type: "REMOVE_ITEM", payload: item.id });
    } else {
    
      dispatch({ type: "UPDATE_QUANTITY", payload: { id: item.id, quantity: newQuantity } });
    }
  };

  const handleRemoveItem = () => {
  
    dispatch({ type: "REMOVE_ITEM", payload: item.id });
   
    showToast(`${item.name} removido do carrinho.`, "info");
  };

  return (
    <div className="flex flex-col items-center justify-between p-4 mb-3 transition-colors duration-300 bg-white border-b border-gray-200 rounded-md shadow-sm sm:flex-row dark:bg-gray-800/50 dark:border-gray-700/50">
      <div className="flex items-center w-full mb-3 sm:mb-0 sm:w-auto">
        <img
          src={item.imageUrl || 'https://via.placeholder.com/100x100/E0E0E0/BDBDBD?text=Sem+Imagem'}
          alt={item.name}
          className="object-cover w-16 h-16 mr-4 border border-gray-200 rounded-md sm:w-20 sm:h-20 dark:border-gray-700"
        />
        <div className="flex-grow">
          <h3 className="text-base font-semibold text-gray-800 sm:text-lg dark:text-gray-100 line-clamp-2">{item.name}</h3>
          <p className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
            R$ {item.price.toFixed(2).replace(".", ",")} cada
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between w-full space-x-2 sm:space-x-3 sm:w-auto sm:justify-end">
        
        <div className="flex items-center border border-gray-300 rounded-md dark:border-gray-600">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-md focus:outline-none focus:ring-1 focus:ring-orange-500"
            aria-label="Diminuir quantidade"
          >
            <Minus size={16} className="text-gray-700 dark:text-gray-300" />
          </button>
          <span className="w-10 px-1 text-sm font-medium text-center text-gray-700 sm:w-12 dark:text-gray-200">
            {item.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-md focus:outline-none focus:ring-1 focus:ring-orange-500"
            aria-label="Aumentar quantidade"
          >
            <Plus size={16} className="text-gray-700 dark:text-gray-300" />
          </button>
        </div>

       
        <p className="w-20 text-sm font-semibold text-right text-blue-600 sm:w-24 sm:text-md dark:text-blue-400">
          R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}
        </p>

       
        <Button
          onClick={handleRemoveItem}
          variant="danger" 
          className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 focus:ring-red-400" 
          title="Remover item do carrinho"
        >
          <Trash2 size={18} />
        </Button>
      </div>
    </div>
  );
};

function showToast(_arg0: string, _arg1: string) {
  throw new Error('Function not implemented.');
}

