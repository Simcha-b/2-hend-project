import React from "react";
import { Link, Outlet, useLoaderData } from "react-router";
import { getCartNumber } from "~/data/db";
import type { Route } from "./+types/Navbar";
import { House, Info, Phone, ShoppingCart } from "lucide-react";

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
            <div className="flex items-center gap-10 shadow-md text-1xl bold p-3">
              <div className="ml-auto text-center flex justify-center">
                <Link to={"/"} className="mb-0">
                  <img
                    src="../../public/logo-500.png"
                    className="w-30 h-16 object-contain mr-2"
                  />
                </Link>
              </div>
              <Link to={"/"} className=" hover:text-green-600 flex">
                <House className="ml-1 size-5" />
                <span>דף הבית</span>
              </Link>
              <Link to={"/about"} className=" hover:text-green-600 flex">
                <Info className="ml-1 size-5" />
                <span>אודות</span>
              </Link>
              <Link to={"/contact"} className="flex hover:text-green-600">
                <Phone className="ml-1 size-5" />
                <span className="">צור קשר</span>
              </Link>
              <Link
                to="/cart"
                className="flex h-12 w-12 items-center justify-center rounded-2xl hover:bg-green-600 hover:text-white"
              >
                <div className="relative inline-block ">
                  {cartNumber > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-900 text-white text-[10px] leading-none font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
                      {cartNumber}
                    </span>
                  )}

                  <span className="text-xl"><ShoppingCart/></span>
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
        <footer className="text-center bottom-0 p-2 mt-auto">©sbb-2025</footer>
      </div>
    </>
  );
}
export default Navbar;
