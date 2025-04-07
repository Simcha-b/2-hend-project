import { type Product } from "../types/products";
import { readFile } from "fs/promises";

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await readFile("./app/data/products.json", "utf8");
    const products = JSON.parse(data);
    return products;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}

export async function getProductByCategory(
  category: string
): Promise<Product[] | undefined> {
  try {
    const data = await getProducts();
    const products = data.filter((product) => product.category === category);
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
    return product;
  } catch (err) {
    console.error("Error reading product:", err);
    throw err;
  }
}
