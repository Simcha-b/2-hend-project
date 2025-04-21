import { type RouteConfig } from "@react-router/dev/routes";
import { index, route, layout } from "@react-router/dev/routes";

export default [
  layout("layouts/Navbar.tsx", [
    index("routes/home.tsx"),
    route("new", "routes/new.tsx"),
    route("cart", "routes/cart.tsx"),
    route("about", "routes/about.tsx"),
    route("contact", "routes/contact.tsx"),
    route(":category/:id", "routes/productDetails.tsx"),
    route(":category", "routes/productList.tsx"),
   
  ]),
] satisfies RouteConfig;
