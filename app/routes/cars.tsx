import { getProductByCategory } from "../data/db";
import type { Route } from "../+types/root";
import Card from "~/componets/card";
import type { Product } from "~/types/products";

export async function loader() {
  const data = await getProductByCategory("car");
  return data;
}

function Cars({ loaderData }: Route.ComponentProps) {
  const cars: Product[] = loaderData;
  return (
    <>
      <h1 className="text-center text-3xl p-5">מכוניות יד שניה</h1>
      <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
        {cars.map((car) => (
          <Card key={car.id} car={car} />
        ))}
      </div>
    </>
  );
}

export default Cars;
