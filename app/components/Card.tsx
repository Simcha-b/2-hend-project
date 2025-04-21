import React from "react";
import { Link } from "react-router";
import type { Product } from "~/types/products";

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  return (
    product && (
      <Link
        to={`./${product.id}`}
        className="block"
      >
        {" "}
        <div className="border border-amber-300 bg-amber-50 hover:bg-amber-100 transition rounded-2xl p-5 shadow-md hover:shadow-lg max-w-xs h-[350px]">
          <div className="relative w-full h-40 bg-gray-200 rounded-md overflow-hidden">
            <img
              src={Array.isArray(product.image) && product.image[0] ? product.image[0] : "/placeholder.png"}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="mt-4">
            {/* שם המוצר */}
            <h2 className="text-xl font-semibold text-gray-800 truncate">
              {product.name}
            </h2>

            {/* מחיר */}
            <span className="text-lg font-bold">
              ₪{product.price.toLocaleString()}
            </span>

            {/* מידע על המוכר */}
            <div className="mt-2 text-sm text-gray-600">
              <p>{product.sellerInfo.name}</p>
              <p>{product.sellerInfo.location}</p>
            </div>
          </div>
        </div>
      </Link>
    )
  );
}
