import { ArrowRight, CreditCard, ShieldCheck, ShoppingBag, Trash2, Truck } from 'lucide-react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartItemCard } from '../components/cart/CartItemCard'; // Ajuste o caminho se necessário
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';

export const CartPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const { showToast } = useToast(); 
  const navigate = useNavigate();

  
  const { items: cartItems, itemCount, total } = state;

  

  const handleClearCart = () => {
    dispatch({ type: "CLEAR_CART" });
    showToast("Seu carrinho foi esvaziado.", "info");
  };

  const handleCheckout = () => {
    if (itemCount > 0) {
      navigate('/checkout');
    } else {
      showToast("Seu carrinho está vazio. Adicione produtos antes de finalizar!", "warning");
    }
  };


 
  if (itemCount === 0) {
    return (
      <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-gray-50 dark:bg-gray-950 transition-colors duration-300 py-10">
        <div className="container px-4 mx-auto">
          <div className="max-w-md p-8 mx-auto text-center bg-white border border-gray-200 rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-center w-24 h-24 mx-auto mb-6 bg-orange-100 rounded-full dark:bg-orange-500/10">
              <ShoppingBag className="w-12 h-12 text-orange-500" />
            </div>
            <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">Seu carrinho está vazio</h1>
            <p className="mb-8 text-gray-600 dark:text-gray-400">Adicione alguns produtos incríveis ao seu carrinho para continuar.</p>
            <Link to="/">
              <button className="px-8 py-3 text-base font-semibold text-white transition-colors duration-150 bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800">
                Continuar Comprando
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-100 dark:bg-gray-950">
      <div className="container px-4 py-8 mx-auto">
        <div className="flex flex-col items-start justify-between mb-8 sm:flex-row sm:items-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-800 dark:text-gray-50 sm:mb-0">Meu Carrinho</h1>
          <span className="text-gray-600 dark:text-gray-400">{itemCount} item(ns)</span>
        </div>

        <div className="grid items-start grid-cols-1 gap-8 lg:grid-cols-3">
       
          <div className="space-y-6 lg:col-span-2">
          
            <div className="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800/50 dark:border-gray-700/50">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700/50">
                <h2 className="flex items-center text-lg font-semibold text-gray-700 dark:text-gray-200">
                  <ShoppingBag className="w-5 h-5 mr-3 text-orange-500" />
                  Itens no Carrinho
                </h2>
                {itemCount > 0 && (
                   <button
                    onClick={handleClearCart}
                    className="flex items-center px-3 py-1.5 text-xs font-medium text-red-600 rounded-md hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-700/30 focus:outline-none focus:ring-1 focus:ring-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5 mr-1" />
                    Limpar Carrinho
                  </button>
                )}
              </div>

           
              {cartItems.map((item) => (
                <CartItemCard key={item.id} item={item} />
              ))}
            </div>

        
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800/50 dark:border-gray-700/50">
              <h3 className="mb-4 text-base font-semibold text-gray-700 dark:text-gray-200">Vantagens de comprar na RocketStore</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
                {[
                  { icon: Truck, title: "Frete Grátis", desc: "Em compras acima de R$ 99" },
                  { icon: ShieldCheck, title: "Compra Segura", desc: "Seus dados protegidos" },
                  { icon: CreditCard, title: "Parcelamento", desc: "Em até 12x sem juros" },
                ].map((advantage, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <advantage.icon className="w-6 h-6 text-orange-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-100">{advantage.title}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{advantage.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        
          <div className="lg:col-span-1">
            <div className="sticky bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800/50 dark:border-gray-700/50 top-24">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700/50">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">Resumo do Pedido</h2>
              </div>
              <div className="p-6">
                <div className="mb-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal ({itemCount} itens)</span>
                    <span className="font-medium text-gray-800 dark:text-gray-100">R$ {total.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Frete</span>
                    <span className="font-medium text-green-600 dark:text-green-400">Grátis</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Desconto Aplicado</span>
                    <span className="font-medium text-orange-500">- R$ 0,00</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <div className="flex justify-between text-base font-bold sm:text-lg">
                      <span className="text-gray-800 dark:text-gray-50">Total</span>
                      <span className="text-gray-800 dark:text-gray-50">R$ {total.toFixed(2).replace(".", ",")}</span>
                    </div>
                    {total > 0 && (
                      <p className="mt-1 text-xs text-right text-green-600 dark:text-green-400">
                        em até 12x de R$ {(total / 12).toFixed(2).replace(".", ",")} s/juros
                      </p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="coupon" className="block mb-1.5 text-sm font-medium text-gray-700 dark:text-gray-300">Cupom de desconto</label>
                  <div className="flex gap-2">
                    <input
                      id="coupon"
                      type="text"
                      placeholder="Digite seu cupom"
                      className="flex-1 p-2.5 text-sm bg-white dark:bg-gray-700/50 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
                    />
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-semibold text-orange-500 transition-colors duration-150 border border-orange-500 rounded-md shadow-sm hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400"
                    >
                      Aplicar
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold flex items-center justify-center gap-2 py-3.5 px-4 rounded-lg text-base sm:text-lg transition-colors duration-150 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                  >
                    <span>Finalizar Compra</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <Link to="/" className="block">
                    <button className="w-full px-4 py-3 text-base font-semibold text-gray-700 transition-colors duration-150 border border-gray-300 rounded-lg shadow-sm dark:border-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400">
                      Continuar Comprando
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};