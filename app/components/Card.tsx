import React from "react";
import { Link } from "react-router";
import type { Product } from "~/types/products";

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  return (
    product && (
      <Link to={`./${product.id}`} className="block">
        {" "}
        <div className="border hover:bg-gray-100 transition rounded-sm shadow-md hover:shadow-lg hover:-translate-y-1.5 duration-300">
          <div className="relative w-full h-40 bg-gray-200 rounded-sm overflow-hidden">
            <img
              src={
                Array.isArray(product.image) && product.image[0]
                  ? product.image[0]
                  : "/placeholder.png"
              }
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="mt-4 p-2">
            {/* שם המוצר */}
            <h2 className="text-xl font-semibold text-gray-800 truncate">
              {product.name}
            </h2>

            {/* מחיר */}
            <span className="font-bold text-green-600">₪{product.price.toLocaleString()}</span>
            <p className="text-sm line-clamp-1">{product.description}</p>

            {/* מידע על המוכר */}
            <div className="mt-2 text-sm text-gray-600">
              <div className="flex justify-between mt-4">
                  <p className= "text-[12px] bg-amber-100 rounded-full p-y-1 px-2">
                    {product.condition === "Used" ? "משומש" : "חדש"}
                  </p>
                <p>{product.sellerInfo.location}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  );
}
