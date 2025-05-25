export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category?: string;
  stock?: number; 

  images?: string[]; 
  rating?: number; 
  reviewCount?: number; 
  sku?: string; 
  tags?: string[]; 
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ProductFiltersType {
  category: string; 
  sortBy: string;
  search?: string;  
}