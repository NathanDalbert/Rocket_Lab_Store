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
  brand?: string;            
 
}

export interface CartItem extends Product {
  quantity: number;
}


export type SortByType = 
  | "relevance" 
  | "price-asc" 
  | "price-desc" 
  | "rating" 
  | "reviews" 
  | "newest" 
  | "name-asc"  
  | "name-desc"; 

export interface SearchFilters {
  query: string;
  category: string;               
  priceRange: [number, number];  
  rating: number;                
  brands: string[];               
  inStock: boolean;              
  sortBy: SortByType;
}


export interface ProductFiltersType { 
  category: string;
  sortBy: SortByType; 
  search?: string;     
}