import type { Car, Electronics } from "~/types/products";

export const productCreators = {
  cars: (): Car => ({
    id: "",
    name: "",
    category: "cars",
    price: 0,
    description: "",
    condition: "",
    model: "",
    year: 0,
    Mileage: 0,
    color: "",
    sellerInfo: {
      name: "",
      contact: "",
      location: "",
    },
    image: ["/placeholder.png"],
  }),
  electronics: (): Electronics => ({
    id: "",
    name: "",
    category: "electronics",
    price: 0,
    description: "",
    condition: "",
    model: "",
    brand: "",
    specifications: {},
    sellerInfo: {
      name: "",
      contact: "",
      location: "",
    },
    image: ["/placeholder.png"],
  }),
};
