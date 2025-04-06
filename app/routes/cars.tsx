import type { Product } from "~/types/products";
import { getProductByCategory } from "../data/db";
import type { Route } from "../+types/root";
export async function loader() {
  const data = await getProductByCategory("car");
  return data;
}
function cars({ loaderData }: Route.ComponentProps) {
  const cars = loaderData;
  return (
    cars && (
      <div>
        <h1>cars</h1>
        <ul>
          {cars.map((car) => (
            <li key={car.id}>{car.name}</li>
          ))}
        </ul>
      </div>
    )
  );
}

export default cars;
