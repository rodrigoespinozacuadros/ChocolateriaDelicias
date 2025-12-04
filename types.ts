export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'truffle' | 'bar' | 'gift' | 'hot-chocolate';
  featured?: boolean;
  ingredients?: string[];
  weight?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Section = 'home' | 'shop' | 'about' | 'contact';