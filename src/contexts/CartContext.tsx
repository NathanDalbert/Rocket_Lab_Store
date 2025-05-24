import React, { createContext, type ReactNode, useContext, useEffect, useReducer } from "react";
import type { Product } from "../types"; // Ajustado o caminho para os tipos do nosso projeto

export interface CartItem extends Product {
  quantity: number;
}


interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}


type CartAction =
  | { type: "ADD_ITEM"; payload: { product: Product; quantity: number } } 
  | { type: "REMOVE_ITEM"; payload: string } 
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };


const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);


function cartReducer(state: CartState, action: CartAction): CartState {
  let newItems: CartItem[];
  let newTotal: number;
  let newItemCount: number;

  switch (action.type) {
    case "ADD_ITEM": {
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === product.id);

      if (existingItemIndex > -1) {
      
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      } else {
       
        newItems = [...state.items, { ...product, quantity: quantity }];
      }
      newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      return { ...state, items: newItems, total: newTotal, itemCount: newItemCount };
    }

    case "REMOVE_ITEM": {
      newItems = state.items.filter((item) => item.id !== action.payload); 
      newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      return { ...state, items: newItems, total: newTotal, itemCount: newItemCount };
    }

    case "UPDATE_QUANTITY": {
      if (action.payload.quantity <= 0) {
      
        return cartReducer(state, { type: "REMOVE_ITEM", payload: action.payload.id });
      }
      newItems = state.items.map((item) =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
      newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      return { ...state, items: newItems, total: newTotal, itemCount: newItemCount };
    }

    case "CLEAR_CART":
      return { items: [], total: 0, itemCount: 0 };

    case "LOAD_CART": {
    
      newItems = action.payload;
      newTotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      newItemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      return { items: newItems, total: newTotal, itemCount: newItemCount };
    }

    default:
     
      return state;
  }
}


export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

 
  useEffect(() => {
    if (typeof window !== "undefined") { 
      const savedCart = localStorage.getItem("rocketlab-cart"); 
      if (savedCart) {
        try {
          const cartItems: CartItem[] = JSON.parse(savedCart);
          if (Array.isArray(cartItems)) { 
            dispatch({ type: "LOAD_CART", payload: cartItems });
          } else {
            console.error("Dados do carrinho salvos em formato inválido.");
            localStorage.removeItem("rocketlab-cart"); 
          }
        } catch (error) {
          console.error("Erro ao carregar e parsear carrinho do localStorage:", error);
          localStorage.removeItem("rocketlab-cart"); 
        }
      }
    }
  }, []); 


  useEffect(() => {
    if (typeof window !== "undefined") {
    
      if (state.items.length > 0 || localStorage.getItem("rocketlab-cart") !== null) {
         localStorage.setItem("rocketlab-cart", JSON.stringify(state.items));
      }
    }
  }, [state.items]);

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
}


export function useCart() {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
}