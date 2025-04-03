import type { Product } from "../types/products";
import { readFile } from "fs/promises";

export async function getProducts(): Promise<Product[]> {
  try {
    const data = await readFile("./products.json", "utf8");
    const products = JSON.parse(data);
    return products;
  } catch (err) {
    console.error("שגיאה בקריאת הקובץ:", err);
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
    console.error("שגיאה בקריאת המוצרים:", err);
    throw err;
  }
}

export async function getProductById(id: number): Promise<Product | undefined> {
  try {
    const data = await getProducts();
    const product = data.find((product) => product.id === id);
    return product;
  } catch (err) {
    console.error("שגיאה בקריאת המוצר:", err);
    throw err;
  }
}
