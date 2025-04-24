import { addToCart, isProductInCart, removeFromCart } from "~/data/db";
import type { Route } from "../+types/root";

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const productId = formData.get("productId") as string;
  const inCart = await isProductInCart(productId);
  if (inCart) {
    await removeFromCart(productId);
  } else {
    await addToCart(productId);
  }
  return { inCart: !inCart };
}
