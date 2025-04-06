import React from "react";
import type { Product } from "~/types/products";

interface CardProps {
  car: Product;
}

function Card({ car }: CardProps) {
  return (
    car && (
      <div className="border border-amber-300 bg-amber-100 p-5 rounded-2xl">
        <ul>
          <li>{car.name}</li>
          <li>{car.price}</li>
          <li>{car.description}</li>
          <li className="font-bold">פיצ'רים:</li>
          {car.features?.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
          <li className="font-bold">פרטי מוכר:</li>
          <li>{car.sellerInfo.name}</li>
          <li>{car.sellerInfo.contact}</li>
          <li>{car.sellerInfo.location}</li>
        </ul>
      </div>
    )
  );
}

export default Card;