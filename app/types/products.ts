export interface Product {
  id: string;
  name: string;
  category: "car" | "electronics";
  price: number;
  description: string;
  condition: string;
  features?: string[];
  make?: string;
  brand?: string;
  model: string;
  sellerInfo: {
    name: string;
    contact: string;
    location: string;
  };
}
export interface Car extends Product {
  year: number;
  Mileage: number;
  color: string;
}
export interface Electronics extends Product {
  specifications?: Record<string, string>;
}
export type ProductUnion = Car | Electronics;
