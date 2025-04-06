import React from "react";
import { Link, Outlet } from "react-router";

function Navbar() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <div className="flex-1">
          <div className="flex gap-10 shadow-md text-2xl bold p-3">
            <Link to={"/"}>logo</Link>
            <Link to={"/cars"}>מכוניות</Link>
            <Link to={"/electronics"}>אלקטרוניקה</Link>
            <Link to={"/new"}>מכירת פריט חדש</Link>
            <div className="mr-auto">
              <Link to={"/basket"}>סל קניות</Link>
            </div>
          </div>
          <div>
            <Outlet />
          </div>
        </div>
        <footer className="text-center">נבנה ע"י sbb-2025</footer>
      </div>
    </>
  );
}
export default Navbar;
