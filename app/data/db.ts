import { readFileSync, writeFileSync } from "fs";
import { type Product, type Car, type Electronics } from "../types/products";
import type { filters } from "../types/filters";
import { readFile } from "fs/promises";

/**---------------Products--------------- */
export async function getProducts(): Promise<Product[]> {
  try {
    const data = await readFile("./app/data/products.json", "utf8");
    let products = JSON.parse(data);
    return products;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}

export async function getProductByCategory(
  category: string,
  filters: filters = {}
): Promise<Car[] | Electronics[]> {
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
      if (filters?.maxPrice) {
        products = products.filter(
          (product) => Number(product.price) <= Number(filters.maxPrice!!)
        );
      }
      if (filters?.fromYear && filters?.toYear) {
        products = products.filter(
          (product) =>
            product.year >= Number(filters.fromYear) &&
            product.year <= Number(filters.toYear)
        );
      }
      if (filters?.q && filters.q.trim().length > 0) {
        const query = filters.q.toLowerCase();
        products = products.filter((p) => p.name.toLowerCase().includes(query));
      }
    }
    products.sort((a, b) => Number(b.id) - Number(a.id));
    return products;
  } catch (err) {
    console.error("Error reading products", err);
    throw err;
  }
}

export async function getProductById(
  productId: string
): Promise<{ product: Product | undefined; inCart: boolean } | undefined> {
  try {
    const data = await getProducts();
    const product = data.find((p) => p.id === productId);
    const inCart = await isProductInCart(productId);
    return { product, inCart };
  } catch (err) {
    console.error("Error reading product:", err);
    throw err;
  }
}

export async function addProduct(product: Car | Electronics) {
  try {
    const data = await getProducts();
    product.id = String(Number(data[data.length - 1].id) + 1);
    data.push(product);
    writeFileSync("./app/data/products.json", JSON.stringify(data));
    console.log("Product added:", product);
    return product;
  } catch (err) {
    console.error("Error adding product:", err);
    throw err;
  }
}
//remove product by id
export async function removeProductById(id: string) {
  try {
    const data = await getProducts();
    const product = data.find((p) => p.id === id);
    if (!product) {
      throw new Error("Product not found");
    }
    const newData = data.filter((p) => p.id !== id);
    writeFileSync("./app/data/products.json", JSON.stringify(newData));
    console.log("Product removed:", product);
    return product;
  } catch (err) {
    console.error("Error removing product:", err);
    throw err;
  }
}


/**------------------filters--------------------- */

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

export async function getCarsYears() {
  const cars = await getProductByCategory("cars", {});
  let carsYears = cars.map((p) => p.year);
  const allYears = Array.from(new Set(carsYears));
  allYears.sort();
  console.log(allYears);
  return allYears;
}

/**----------------cart----------------------------- */
export async function getCart(): Promise<string[]> {
  try {
    const data = readFileSync("./app/data/cart.json", "utf8");
    const cart = JSON.parse(data);
    return cart;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}

export async function addToCart(id: string): Promise<string[]> {
  try {
    if (await isProductInCart(id)) throw new Error("Product already in cart");
    const cart = await getCart();
    cart.push(id);
    writeFileSync("./app/data/cart.json", JSON.stringify(cart));
    console.log(`add ${id} to cart!`);
    return cart;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}

export async function removeFromCart(id: string): Promise<string[]> {
  try {
    let cart = await getCart();
    cart = cart.filter((i: string) => i !== id);
    writeFileSync("./app/data/cart.json", JSON.stringify(cart));
    return cart;
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}

export async function removeAllFromCart() {
  try {
    writeFileSync("./app/data/cart.json", JSON.stringify([]));
    return [];
  } catch (err) {
    console.error("Error reading file:", err);
    throw err;
  }
}

export async function isProductInCart(id: string) {
  const cart = await getCart();
  console.log(cart.includes(id), id);
  return cart.includes(id);
}
export async function getCartNumber() {
  const cart = await getCart();
  return cart.length;
}
