import React from "react";
import { Link, Outlet } from "react-router";

function Navbar() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="sticky top-0 z-10 bg-white shadow-md">
          <div className="flex-1">
            <div className="flex gap-10 shadow-md text-2xl bold p-3 text-green-700">
              <div className="ml-auto">
                <Link to={"/"}>דף הבית</Link>
              </div>

              <Link to={"/"}>אודות</Link>
              <Link to={"/"}>צור קשר</Link>
              <Link to={"/basket"}>סל קניות 🛒</Link>
              <button className="bg-green-700 text-white text-sm rounded-2xl p-3 font-bold ring-2 shadow-2xl text-center hover:transform hover:scale-105">
                <Link to={"/new"}>מכור פריט</Link>
              </button>
            </div>
          </div>
        </div>

        <div>
          <Outlet />
        </div>
        <footer className="text-center p-4">©sbb-2025</footer>
      </div>
    </>
  );
}
export default Navbar;
