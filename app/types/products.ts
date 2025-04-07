export interface Product {
    id: string;
    name: string;
    category: "car" | "electronics";
    price: number;
    description: string;
    condition: string;
    features?: string[];
    sellerInfo: {
      name: string;
      contact: string;
      location: string;
    };
  }
  export interface Car extends Product {
    make: string;
    model: string;
    year: number;
    Mileage: number;
    color: string;
  }
  export interface Electronics extends Product {
    brand: string;
    model: string;
    specifications?: Record<string, string>;
  }
  export type ProductUnion = Car | Electronics;
