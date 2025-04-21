import React from "react";
import type { ProductUnion } from "~/types/products";

function Cart(item: ProductUnion) {

  return (
    <div className="text-4xl flex flex-col justify-center items-center">
      <h1> סל קניות</h1>
      <div>

      </div>
    </div>
  );
}

export default Cart;
