import React from "react";
import { Link, Outlet, useLoaderData } from "react-router";
import { getCartNumber } from "~/data/db";
import type { Route } from "./+types/Navbar";

export async function loader() {
  const cartNumber = await getCartNumber();
  return { cartNumber };
}
function Navbar(loaderData: Route.LoaderArgs) {
  const { cartNumber } = useLoaderData() as { cartNumber: number };
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="sticky top-0 z-10 bg-white shadow-md">
          <div className="flex-1">
            <div className="flex items-center gap-10 shadow-md text-xl bold p-3 text-green-700">
              <div className="ml-auto text-center flex justify-center">
                <Link to={"/"}>דף הבית</Link>
              </div>
              <Link to={"/about"}>אודות</Link>
              <Link to={"/contact"}>צור קשר</Link>
              <Link to="/cart">
                <div className="relative inline-block">
                  {cartNumber > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] leading-none font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
                      {cartNumber}
                    </span>
                  )}

                  <span className="text-xl">🛒</span>
                </div>
              </Link>
              <button className="bg-green-700 text-white text-sm rounded-2xl p-3 font-bold ring-2 shadow-2xl text-center hover:transform hover:scale-105">
                <Link to={"/new"}>מכור פריט</Link>
              </button>
            </div>
          </div>
        </div>

        <div>
          <Outlet />
        </div>
        <footer className="text-center bottom-0 p-2">©sbb-2025</footer>
      </div>
    </>
  );
}
export default Navbar;
