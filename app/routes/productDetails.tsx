import { getProductById } from "~/data/db";
import type { Route } from "./+types/productDetails";
import { useLoaderData } from "react-router";
import type { Car, Electronics } from "~/types/products";

export async function loader({ params }: Route.LoaderArgs) {
  const product = await getProductById(params.id!);
  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  return { product };
}
function isCar(product: Car | Electronics): product is Car {
  return product.category === "cars";
}

function isElectronics(product: Car | Electronics): product is Electronics {
  return product.category === "electronics";
}

export default function productDetails() {
  const { product } = useLoaderData();
  return (
    <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4">
      <h2 className="text-2xl font-bold">{product.name}</h2>
      <p className="text-gray-600">₪{product.price.toLocaleString()}</p>
      
      <p className="text-gray-700">{product.description}</p>

      {isCar(product) && (
        <div className="pt-4 border-t">
          <h3 className="font-semibold text-lg">פרטי רכב</h3>
          <p>יצרן: {product.make}</p>
          <p>דגם: {product.model}</p>
          <p>שנה: {product.year}</p>
          <p>ק״מ: {product.Mileage.toLocaleString()} ק״מ</p>
          <p>צבע: {product.color}</p>
        </div>
      )}

      {isElectronics(product) && (
        <div className="pt-4 border-t">
          <h3 className="font-semibold text-lg">פרטי מוצר</h3>
          <p>מותג: {product.brand}</p>
          <p>דגם: {product.model}</p>
          {product.specifications && (
            <ul className="list-disc list-inside mt-2">
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key}>
                  <span className="font-medium">{key}:</span> {value as string}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
      <div className="border-t pt-4 text-sm text-gray-500">
        <p>מצב: {product.condition === "new" ? "חדש" : "משומש"}</p>
        <p>איש קשר: {product.sellerInfo.name}</p>
        <p>מיקום: {product.sellerInfo.location}</p>
        <p>טלפון: {product.sellerInfo.contact}</p>
      </div>
    </div>
  );
}
