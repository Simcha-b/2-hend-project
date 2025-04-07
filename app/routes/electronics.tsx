import Card from "~/components/Card";
import { getProductByCategory } from "~/data/db";
import type { Product } from "~/types/products";
import type { Route } from "./+types/electronics";

export async function loader() {
  const data = await getProductByCategory("electronics");
  return data;
}

function electronics({ loaderData }: Route.ComponentProps) {
  const electronics = loaderData as Product[] | undefined;
  if (!electronics) {
    return <div>Loading...</div>; // or return an error message
  }
  return (
    <>
      <h1 className="text-center text-3xl p-5">מוצרי אלקטרוניקה יד שניה</h1>
      <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {electronics.map((electronic) => (
          <Card key={electronic.id} product={electronic} />
        ))}
      </div>
    </>
  );
}

export default electronics;
