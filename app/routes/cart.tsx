import React from "react";
import type { ProductUnion } from "~/types/products";
import type { Route } from "./+types/cart";
import { getCart, getProductById, removeFromCart } from "~/data/db";
import { Trash2Icon } from "lucide-react";
import { Form, useSubmit } from "react-router";

export async function loader() {
  const items = await getCart();
  if (items.length === 0) {
    console.log("no items in cart");
    return { products: [], totalPrice: 0 };
  }
  const products = [];
  let totalPrice = 0;
  for (let index = 0; index < items.length; index++) {
    let { product } = await getProductById(items[index]);
    products.push(product);
    totalPrice += Number(product?.price);
  }
  return { products, totalPrice };
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const productId = formData.get("productId");
  const cart = await removeFromCart(productId as string);
}

function Cart({ loaderData }: Route.ComponentProps) {
  const submit = useSubmit();
  const { products, totalPrice } = loaderData;
  return (
    <div className="flex flex-col items-center justify-center m-10">
      <h1 className="text-3xl mb-8">סל קניות </h1>
      <div className="min-w-full min-h-[50vh] flex justify-center">
        <div className="min-w-full flex justify-center  gap-5">
          <div className="border-black min-w-2/3 border-1 rounded-2xl p-4 flex flex-col gap-5">
            {products.map((p) => (
              <div className="flex w-full max-w-5xl min-h-20 bg-white rounded-xl shadow-md p-4 gap-4 text-right">
                {/* תמונה */}
                <div className="w-1/4 bg-gray-100 rounded-lg flex items-center justify-center">
                  <img
                    src={p.image[0]}
                    className="w-full h-full p-2 object-contain"
                  />
                </div>
                {/* תוכן */}
                <div className="flex justify-between w-3/4">
                  {/* תיאור המוצר */}
                  <div className="flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold">{p?.name}</h3>
                      <p className="text-sm text-gray-500">
                        {p?.make || p?.brand} • {p?.model}{" "}
                      </p>
                    </div>
                  </div>
                  {/* מחיר וכפתור מתחתיו */}
                  <div className="flex flex-col items-end justify-between">
                    <div className="text-green-600 font-bold text-lg">
                      ₪{p?.price.toLocaleString()}
                    </div>
                    <Form method="post">
                      <input type="hidden" name="productId" value={p?.id} />
                      <button className="text-gray-900  hover:cursor-pointer">
                        <Trash2Icon className="w-5 h-5 hover:text-red-500 cursor-pointer" />
                      </button>
                    </Form>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="border-black min-w-1/3 border-1 rounded-2xl p-4">
            <h1 className="text-center font-bold text-2xl underline">
              סיכום הזמנה
            </h1>
            <div className="flex justify-between mt-5 border-b-2 border-t-2 border-black">
              <div>סכום לתשלום:</div>
              <div>₪{totalPrice.toLocaleString()} </div>
            </div>
            <button type="button">המשך לתשלום</button>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Cart;
