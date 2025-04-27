import {
  addToCart,
  getProductById,
  isProductInCart,
  removeFromCart,
} from "~/data/db";
import type { Route } from "./+types/productDetails";
import type { Car, Electronics } from "~/types/products";
import { Button } from "~/components/ui/button";
import { useFetcher, useNavigate } from "react-router";
import { ArrowRight, Check } from "lucide-react";
import { useState } from "react";

export async function loader({ params }: Route.LoaderArgs) {
  const { product, inCart } = await getProductById(params.id!);
  if (!product) {
    throw new Response("Not Found", { status: 404 });
  }
  return { product, inCart };
}
export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const productId = formData.get("productId") as string;
  const inCart = await isProductInCart(productId);
  if (inCart) {
    await removeFromCart(productId);
  } else {
    await addToCart(productId);
  }
}

function isCar(product: Car | Electronics): product is Car {
  return product.category === "cars";
}

function isElectronics(product: Car | Electronics): product is Electronics {
  return product.category === "electronics";
}

export default function productDetails({ loaderData }: Route.ComponentProps) {
  const { product, inCart } = loaderData;

  const fetcher = useFetcher();

  const [imageToShow, setImageToShow] = useState(
    Array.isArray(product.image) ? product.image[0] : ""
  );
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Button
          className="mr-5 mt-5 mb-5 hover:cursor-pointer"
          onClick={() => {
            navigate(-1);
          }}
        >
          {" "}
          <ArrowRight />
          חזור
        </Button>
      </div>
      <div className="flex">
        <div className="m-5">
          <div className="flex justify-center items-center ml-5">
            <img
              src={imageToShow}
              alt={product.name}
              className="w-md  rounded-2xl "
            />
          </div>

          <div className="flex justify-between p-5">
            {product.image?.map((img) => (
              <div
                className={
                  img === imageToShow ? "border-3 border-black rounded-2xl" : ""
                }
              >
                <img
                  src={img}
                  alt=""
                  className="h-40 w-40 p-2 hover:cursor-pointer"
                  onClick={() => setImageToShow(img)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="relative w-2xl h-full bg-white shadow-md rounded-2xl p-6 mr-10">
          <fetcher.Form method="post">
            <input type="hidden" name="productId" value={product.id} />
            <Button
              type="submit"
              className="absolute left-5 hover:cursor-pointer"
              disabled={
                fetcher.state == "submitting" || fetcher.state == "loading"
              }
            >
              {inCart ? "הסר מהסל 🗑️" : "הוסף לסל ❤️"}
            </Button>
          </fetcher.Form>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold m-">{product.name}</h2>
            <div className="flex gap-4">
              <span className="text-[12px] bg-gray-200 rounded-2xl p-1">
                {product.condition == "new" ? "חדש" : "משומש"}
              </span>
              <p>
                {" "}
                <strong>מותג:</strong>{" "}
                {isCar(product) ? product.brand : product.brand}
              </p>
              {isCar(product) && (
                <p>
                  <strong>שנה:</strong> {product.year}
                </p>
              )}
            </div>
            <h3 className="text-green-900 text-2xl font-bold">
              ₪{product.price}
            </h3>

            <p className="text-gray-700">{product.description}</p>

            {isCar(product) && (
              <div className="pt-4 border-t">
                <h3 className="font-semibold text-lg">פרטי רכב</h3>
                <p>דגם: {product.model}</p>
                <p>ק״מ: {product.Mileage} ק״מ</p>
                <p>צבע: {product.color}</p>
              </div>
            )}
            {isElectronics(product) && (
              <div className="pt-4 border-t">
                <h3 className="font-semibold text-lg">מפרט טכני</h3>
                <p className="m-2">דגם: {product.model}</p>
                {product.specifications && (
                  <table className="table-auto border border-gray-900 w-full mt-2">
                    <tbody>
                      {Object.entries(product.specifications).map(
                        ([key, value]) => (
                          <tr key={key} className="border-b  border-gray-900">
                            <td className="px-4 py-2 font-medium border bg-gray-200 border-gray-900">
                              {key}:
                            </td>
                            <td className="px-4 py-2">{value as string}</td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                )}
              </div>
            )}
            <div>
              <h2 className="font-semibold text-lg">תכונות</h2>
              <div className="grid grid-cols-2 grid-rows-2 gap-4 mt-2">
                {product.features.map((feature) => (
                  <div className="flex gap-2">
                    <Check />
                    <div key={feature}>{feature}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t pt-4">
              <h2 className="font-semibold text-lg">פרטי המוכר</h2>
              <div className="text-sm text-gray-500">
                <p>{product.sellerInfo.name}</p>
                <p>{product.sellerInfo.location}</p>
                <p>{product.sellerInfo.contact}</p>
              </div>
              <button className=" hover:bg-green-700 hover:text-white hover:cursor-pointer font-bold py-2 px-4 rounded mt-4 w-full">
                יצירת קשר עם המוכר
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
