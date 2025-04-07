import { getProductById } from "~/data/db";
import type { Route } from "./+types/carDetails";
import ProductDetails from "~/components/productDetails";
import type { Car, Electronics } from "~/types/products";

type LoaderData = {
  product: Car | Electronics;
};

export async function loader({ params }: Route.LoaderArgs) {
  const product = await getProductById(params.electronicsId!);
  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  return { product };
}
function carDetails({ loaderData }: { loaderData: LoaderData }) {
  const product = loaderData.product;
  return <ProductDetails product={product} />;
}

export default carDetails;
