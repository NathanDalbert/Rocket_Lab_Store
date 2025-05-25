import type { Product } from '../types';


import imgBlusa from '../imagens/Blusa.png';
import imgCafeteira from '../imagens/Cafeteira.png';
import imgLivro from '../imagens/Livro.png';
import imgNotebook from '../imagens/Notebook.png';
import imgSapato from '../imagens/Sapato.png';
import imgSmartphone from '../imagens/SmartPhone.png';

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone Galaxy Pro Max",
    description: "Smartphone premium com câmera de 108MP e tela AMOLED",
    price: 2499.99,
    imageUrl: imgSmartphone, 
    images: [
      imgSmartphone,
     
    ],
    category: "electronics",
    rating: 4.5,
    reviewCount: 128,
    stock: 15,
    sku: "SGP001",
    tags: ["smartphone", "premium", "camera", "amoled"],
  },
  {
    id: "2",
    name: "Notebook Gamer Ultra",
    description: "Notebook para jogos com placa de vídeo dedicada e alta performance.",
    price: 3999.99,
    imageUrl: imgNotebook,
    images: [
      imgNotebook,
    ],
    category: "electronics",
    rating: 4.8,
    reviewCount: 89,
    stock: 7,
    sku: "NGU001",
    tags: ["notebook", "gamer", "performance", "rtx"],
  },
  {
    id: "3",
    name: "Camiseta Premium Cotton", 
    description: "Camiseta 100% algodão orgânico com design exclusivo e moderno.",
    price: 89.99,
    imageUrl: imgBlusa, 
    images: [
      imgBlusa,
    ],
    category: "clothing",
    rating: 4.2,
    reviewCount: 45,
    stock: 50,
    sku: "CPC001",
    tags: ["camiseta", "algodão", "casual", "moda"],
  },
  {
    id: "4",
    name: "Livro: JavaScript Avançado",
    description: "Guia completo para desenvolvimento JavaScript moderno e padrões de projeto.",
    price: 79.99,
    imageUrl: imgLivro,
    images: [
      imgLivro
    ],
    category: "books",
    rating: 4.9,
    reviewCount: 234,
    stock: 0,
    sku: "LJA001",
    tags: ["livro", "programação", "javascript", "desenvolvimento"],
  },
  {
    id: "5",
    name: "Tênis Esportivo Pro Runner",
    description: "Tênis para corrida com tecnologia de amortecimento responsivo e design aerodinâmico.",
    price: 299.99,
    imageUrl: imgSapato, 
    images: [
      imgSapato,
    ],
    category: "sports",
    rating: 4.6,
    reviewCount: 167,
    stock: 25,
    sku: "TEP001",
    tags: ["tênis", "corrida", "esporte", "performance"],
  },
  {
    id: "6",
    name: "Cafeteira Elétrica Deluxe Automática",
    description: "Cafeteira automática com moedor de grãos integrado, display digital e preparo programável.",
    price: 899.99,
    imageUrl: imgCafeteira, 
    images: [
      imgCafeteira
    ],
    category: "home",
    rating: 4.4,
    reviewCount: 78,
    stock: 12,
    sku: "CED001",
    tags: ["cafeteira", "automática", "cozinha", "café", "eletrodoméstico"],
  },
];