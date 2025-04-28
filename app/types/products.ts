export interface Product {
  id: string;
  name: string;
  category: "cars" | "electronics";
  price: number;
  description: string;
  condition: string;
  features?: string[];
  model: string;
  image?: string[];
  sellerInfo: {
    name: string;
    email: string;
    location: string;
    contact: string;
  };
  addedAt: string;
}
export interface Car extends Product {
  make: string;
  year: number;
  Mileage: number;
  color: string;
}
export interface Electronics extends Product {
  specifications?: Record<string, string>;
  brand: string;
}
export type ProductUnion = Car | Electronics;


