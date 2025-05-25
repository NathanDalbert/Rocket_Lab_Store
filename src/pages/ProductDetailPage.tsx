import { Award, ChevronLeft, Clock, Minus, Plus, Shield, ShoppingCart, Star, Truck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ProductCard } from '../components/products/ProductCard';
import { useCart } from '../contexts/CartContext';
import { useToast } from '../contexts/ToastContext';
import { mockProducts } from '../data/mockProducts';
import type { Product } from '../types';


const augmentedMockProducts: Product[] = mockProducts.map(p => {

  const defaultImages = p.imageUrl ? [p.imageUrl] : ["https://via.placeholder.com/600x600/E0E0E0/BDBDBD?text=Imagem+Principal"];
  if (p.id === '1') { 
    return {
      ...p,
      imageUrl: p.imageUrl || defaultImages[0],
      images: p.images && p.images.length > 0 ? p.images : [
        defaultImages[0],
        "https://via.placeholder.com/600x600/FF6347/FFFFFF?text=AstroRocket+Vista+2",
        "https://via.placeholder.com/600x600/ADFF2F/000000?text=AstroRocket+Vista+3",
      ],
      rating: p.rating || 4.7,
      reviewCount: p.reviewCount || 132,
      sku: p.sku || "RKT-X1-PRO",
      tags: p.tags || ["foguete", "espaço", "luxo"],
      stock: p.stock !== undefined ? p.stock : 10, 
    };
  }
 
  return {
    ...p,
    imageUrl: p.imageUrl || defaultImages[0],
    images: p.images && p.images.length > 0 ? p.images : defaultImages,
    rating: p.rating || 4.0,
    reviewCount: p.reviewCount || Math.floor(Math.random() * 100) + 10,
    sku: p.sku || `SKU-${p.id}`,
    tags: p.tags || (p.category ? [p.category] : ["produto"]),
    stock: p.stock !== undefined ? p.stock : 5, 
  };
});



interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
const Input: React.FC<InputProps> = ({ className, ...props }) => (
  <input
    className={`block w-full px-3 py-2 bg-white dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm text-gray-900 dark:text-gray-50 ${className}`}
    {...props}
  />
);

export const ProductDetailPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  
  const { dispatch } = useCart();
  const { showToast } = useToast();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loadingProduct, setLoadingProduct] = useState(true);

  useEffect(() => {
    setLoadingProduct(true);
    const foundProduct = augmentedMockProducts.find(p => p.id === productId);
    
    if (foundProduct) {
      
      let finalImageUrl = foundProduct.imageUrl;
      let finalImages = foundProduct.images && foundProduct.images.length > 0 ? [...foundProduct.images] : [];

      if (!finalImageUrl && finalImages.length > 0) {
        finalImageUrl = finalImages[0];
      } else if (finalImageUrl && finalImages.length === 0) {
        finalImages = [finalImageUrl];
      } else if (!finalImageUrl && finalImages.length === 0) {
     
        finalImageUrl = "https://via.placeholder.com/600x600/E0E0E0/BDBDBD?text=Imagem+Indisponível";
        finalImages = [finalImageUrl];
      }
      
      setProduct({ ...foundProduct, imageUrl: finalImageUrl, images: finalImages });
    } else {
      setProduct(null);
    }
    setSelectedImageIndex(0);
    setQuantity(1);
    setLoadingProduct(false);
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;
    const productInStock = product.stock === undefined || product.stock > 0;

    if (!productInStock) {
      showToast("Produto fora de estoque!", "error"); 
      return;
    }
   
    dispatch({ type: "ADD_ITEM", payload: { product, quantity } });
    showToast(`${quantity}x ${product.name} adicionado(s) ao carrinho!`, "success"); 
  };

  const renderStars = (rating: number = 0) => {
    const fullStars = Math.floor(rating);
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
          i < fullStars
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-200 text-gray-300 dark:fill-gray-600 dark:text-gray-500"
        }`}
      />
    ));
  };

  const relatedProductsList = product 
    ? augmentedMockProducts.filter(p => p.id !== productId && p.category === product.category).slice(0, 4)
    : [];

  if (loadingProduct) {
    return <div className="container px-4 py-8 mx-auto text-center text-gray-500 dark:text-gray-400">Carregando detalhes do produto...</div>;
  }

  if (!product) {
    return <div className="container px-4 py-8 mx-auto text-center text-red-500">Produto não encontrado!</div>;
  }

  const currentImageSrc = product.images && product.images.length > 0 && product.images[selectedImageIndex]
    ? product.images[selectedImageIndex]
    : product.imageUrl || "https://via.placeholder.com/600x600/E0E0E0/BDBDBD?text=Imagem+Indisponível";
  
  const productInStock = product.stock === undefined || product.stock > 0;

  return (
    <div className="min-h-screen py-8 bg-gray-50 dark:bg-gray-950">
      <div className="container px-4 mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-6">
          <Link to="/" className="transition-colors hover:text-orange-500 dark:hover:text-orange-400">Início</Link>
          <span>/</span>
          {product.category && (
            <>
              <Link to={`/category/${product.category.toLowerCase()}`} className="capitalize transition-colors hover:text-orange-500 dark:hover:text-orange-400">{product.category}</Link>
              <span>/</span>
            </>
          )}
          <span className="text-gray-700 dark:text-gray-200 font-medium truncate max-w-[200px] sm:max-w-xs">{product.name}</span>
        </nav>

        <Link to="/" className="inline-flex items-center gap-1.5 text-orange-500 dark:text-orange-400 hover:underline mb-6 text-sm group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Voltar para todos os produtos
        </Link>

        <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-2 xl:gap-12">
          {/* Galeria de Imagens */}
          <div className="space-y-4">
            <div className="relative overflow-hidden bg-white border border-gray-200 rounded-lg shadow-lg aspect-square dark:border-gray-700 dark:bg-gray-800">
              <img
                src={currentImageSrc}
                alt={product.name}
                className="absolute inset-0 object-contain w-full h-full p-2 transition-opacity duration-300"
              />
              {productInStock ? (
                <div className="absolute top-3 left-3 bg-green-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow">Em estoque</div>
              ) : (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2.5 py-1 rounded-full text-xs font-semibold shadow">Fora de estoque</div>
              )}
            </div>

            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square relative overflow-hidden rounded-md border-2 transition-all hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950 ${
                      selectedImageIndex === index ? "border-orange-500 shadow-md" : "border-gray-200 dark:border-gray-700"
                    }`}
                    aria-label={`Ver imagem ${index + 1} de ${product.name}`}
                  >
                    <img
                      src={image || "https://via.placeholder.com/100x100/E0E0E0/BDBDBD?text=Miniatura"}
                      alt={`${product.name} - Imagem ${index + 1}`}
                      className="absolute inset-0 object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Informações do Produto */}
          <div className="space-y-6">
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800/50 dark:border-gray-700/50">
              <h1 className="mb-3 text-2xl font-bold text-gray-800 sm:text-3xl dark:text-gray-50">{product.name}</h1>

              {product.rating !== undefined && product.reviewCount !== undefined && product.rating > 0 && (
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center gap-0.5">{renderStars(product.rating)}</div>
                  <span className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
                    {product.rating.toFixed(1)} ({product.reviewCount} avaliações)
                  </span>
                </div>
              )}
              
              <div className="flex items-baseline gap-2 mb-1">
                 <span className="text-lg text-gray-400 line-through dark:text-gray-500">
                   R$ {(product.price * 1.15).toFixed(2).replace(".", ",")}
                 </span>
                 <span className="bg-orange-100 dark:bg-orange-500/20 text-orange-700 dark:text-orange-300 text-xs font-semibold px-2 py-0.5 rounded-full">15% OFF</span>
              </div>

              <div className="mb-2 text-3xl font-extrabold text-blue-600 sm:text-4xl dark:text-blue-400">R$ {product.price.toFixed(2).replace(".", ",")}</div>

              <div className="flex items-center gap-1.5 mb-5 text-sm">
                <span className="font-medium text-green-600 dark:text-green-400">
                  em até 12x de R$ {(product.price / 12).toFixed(2).replace(".", ",")} sem juros
                </span>
              </div>

              <p className="mb-6 text-sm leading-relaxed text-gray-600 dark:text-gray-300">{product.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-6 text-xs text-gray-700 sm:text-sm dark:text-gray-300">
                {[
                  { icon: Truck, text: "Frete grátis" }, { icon: Shield, text: "Garantia de 1 ano" },
                  { icon: Award, text: "Produto Original" }, { icon: Clock, text: "Envio Rápido" }
                ].map((benefit, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <benefit.icon className="flex-shrink-0 w-4 h-4 text-orange-500" /> <span>{benefit.text}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2">
                  <label htmlFor="quantity" className="sr-only">Quantidade</label>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="p-2.5 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition-colors focus:outline-none focus:ring-1 focus:ring-orange-500"
                    aria-label="Diminuir quantidade"
                  > <Minus className="w-4 h-4" /> </button>
                  <Input
                    id="quantity" type="number" value={quantity} min="1"
                    onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                    className="w-16 text-center h-11 dark:bg-gray-700/80" // Ajuste para consistência visual
                    aria-label="Quantidade"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-1 focus:ring-orange-500"
                    aria-label="Aumentar quantidade"
                  > <Plus className="w-4 h-4" /> </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={!productInStock}
                  className="flex items-center justify-center flex-1 gap-2 px-6 py-3 text-base font-bold text-white transition-colors bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 dark:focus:ring-offset-gray-950 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {productInStock ? 'Adicionar ao Carrinho' : 'Produto Indisponível'}
                </button>
              </div>
            </div>

            {(product.sku || product.category || product.tags) && (
            <div className="p-6 text-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800/50 dark:border-gray-700/50">
              <h2 className="mb-3 text-base font-semibold text-gray-800 dark:text-gray-100">Informações Adicionais</h2>
              <div className="space-y-1.5 text-gray-600 dark:text-gray-300">
                {product.sku && <div className="flex justify-between"><strong className="text-gray-700 dark:text-gray-200">SKU:</strong> <span>{product.sku}</span></div>}
                {product.category && <div className="flex justify-between"><strong className="text-gray-700 dark:text-gray-200">Categoria:</strong> <span className="capitalize">{product.category}</span></div>}
                {product.tags && product.tags.length > 0 && (
                  <div className="flex items-start justify-between">
                    <strong className="text-gray-700 dark:text-gray-200 pt-0.5">Tags:</strong>
                    <div className="flex flex-wrap justify-end gap-1">
                      {product.tags.map((tag) => (
                        <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs px-2 py-0.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            )}
          </div>
        </div>

        {relatedProductsList.length > 0 && (
          <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800/50 dark:border-gray-700/50">
            <h2 className="flex items-center mb-6 text-xl font-bold text-gray-800 sm:text-2xl dark:text-gray-50">
              <span className="hidden sm:block w-1.5 h-6 bg-orange-500 rounded mr-3"></span>
              Produtos que você também pode gostar
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-6">
              {relatedProductsList.map((relatedProd) => (
                <ProductCard key={relatedProd.id} product={relatedProd} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};