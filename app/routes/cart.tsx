import React from "react";
import type { ProductUnion } from "~/types/products";
import type { Route } from "./+types/cart";
import {
  getCart,
  getProductById,
  removeAllFromCart,
  removeFromCart,
} from "~/data/db";
import { ShoppingBag, ShoppingCart, Trash2Icon } from "lucide-react";
import { Form, Link, useSubmit } from "react-router";

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
  const remove = formData.get("remove");
  if (remove === "true") {
    const cart = await removeAllFromCart();
    console.log("remove all from cart");
    return cart;
  }
  console.log("remove from cart");
  const productId = formData.get("productId");
  const cart = await removeFromCart(productId as string);
  return cart;
}

function Cart({ loaderData }: Route.ComponentProps) {
  const submit = useSubmit();
  const { products, totalPrice } = loaderData;
  return (
    <>
      {products.length === 0 ? (
        <>
          <div className="flex flex-col items-center justify-center m-10 gap-5">
            <ShoppingCart size={50} className="text-gray-200" />
            <h1 className="text-3xl font-bold">סל הקניות שלך ריק</h1>
            <div>עדיין לא נבחרו מוצרים</div>
            <button className="flex gap-2 bg-gradient-to-r from-green-400 to-green-600 text-white p-2 rounded-md">
              <Link to={"/"}>המשך בקניות</Link>
              <ShoppingBag />
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center m-10">
          <h1 className="text-3xl mb-8 font-bold">סל הקניות שלך</h1>
          <div className="min-w-full min-h-[50vh] flex justify-center">
            <div className="min-w-full flex justify-center gap-5">
              {/* עגלה */}
              <div className="w-2/3 border border-black rounded-2xl p-4 flex flex-col gap-5">
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
                            {p?.make || p?.brand} • {p?.model}
                          </p>
                        </div>
                      </div>
                      {/* מחיר וכפתור */}
                      <div className="flex flex-col items-end justify-between">
                        <div className="text-green-600 font-bold text-lg">
                          ₪{p?.price.toLocaleString()}
                        </div>
                        <Form method="post">
                          <input type="hidden" name="productId" value={p?.id} />
                          <button className="text-gray-900 hover:cursor-pointer">
                            <Trash2Icon className="w-5 h-5 hover:text-red-500 cursor-pointer" />
                          </button>
                        </Form>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between">
                  <Form method="post">
                    <button
                      className="flex gap-2 border hover:cursor-pointer hover:bg-green-600 hover:text-white p-2 rounded-md"
                      type="submit"
                      name="remove"
                      value="true"
                    >
                      נקה סל
                      <Trash2Icon />
                    </button>
                  </Form>
                  <button className="border flex gap-2 hover:cursor-pointer hover:bg-green-600 hover:text-white p-2 rounded-md">
                    <Link to={"/"}>המשך בקניות</Link>
                    <ShoppingBag />
                  </button>
                </div>
              </div>
              {/* סיכום הזמנה */}
              <div className="w-1/3 border border-black rounded-2xl p-4">
                <h1 className="text-center font-bold text-2xl underline">
                  סיכום הזמנה
                </h1>
                <div className="flex justify-between mt-5 border-b-2 border-t-2 border-black">
                  <div>סכום לתשלום:</div>
                  <div>₪{totalPrice.toLocaleString()}</div>
                </div>
                <div className="flex flex-col items-center">
                  <button
                    type="button"
                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded text-center hover:cursor-pointer hover:bg-green-600"
                  >
                    המשך לתשלום
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Cart;
