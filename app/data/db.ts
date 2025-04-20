import { type Product, type Car, type Electronics } from "../types/products";
import { readFile } from "fs/promises";

export async function getProducts(): Promise<Car[] | Electronics[]> {
  try {
    const data = await readFile("./app/data/products.json", "utf8");
    const products = JSON.parse(data);
    return products;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}
export async function getAllMakes(category: string) {
  const products = await getProducts();
  const validMakes = products
    .map((product) => (category === "cars" ? product.make : product.brand))
    .filter((make) => make !== undefined && make !== null && make !== "");
  const allMakes = Array.from(new Set(validMakes));

  allMakes.sort();

  return allMakes;
}
export async function getPriceRange(
  category: string
): Promise<{ minPrice: number; maxPrice: number }> {
  try {
    const products = await getProducts();
    const filteredProducts = products.filter(
      (product) => product.category === category
    );

    const prices = filteredProducts.map((product) => product.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    return { minPrice, maxPrice };
  } catch (err) {
    console.error("Error calculating price range:", err);
    throw err;
  }
}

export async function getProductByCategory(
  category: string,
  filters: {
    used: boolean;
    new: boolean;
    makes?: string[];
    maxPrice?: number | null;
    q: string | null;
  }
): Promise<Product[]> {
  try {
    const data = await getProducts();
    let products = data.filter((product) => product.category === category);
    if (filters) {
      products = products.filter((product) => {
        if (filters.used && product.condition !== "Used") return false;
        if (filters.new && product.condition !== "New") return false;
        if (filters.makes && filters.makes.length > 0) {
          return filters.makes.includes(
            category === "cars" ? product.make : product.brand
          );
        }
        return true;
      });
    }
    if (filters?.maxPrice) {
      products = products.filter(
        (product) => product.price <= filters.maxPrice
      );
    }
    if (filters?.q && filters.q.trim().length > 0) {
      const query = filters.q.toLowerCase();
      products = products.filter((p) => p.name.toLowerCase().includes(query));
    }
    return products;
  } catch (err) {
    console.error("Error reading products", err);
    throw err;
  }
}

export async function getProductById(
  productId: string
): Promise<Product | undefined> {
  try {
    const data = await getProducts();
    const product = data.find((p) => p.id === productId);
    console.log(product);
    return product;
  } catch (err) {
    console.error("Error reading product:", err);
    throw err;
  }
}
