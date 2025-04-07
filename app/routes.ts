import { type RouteConfig } from "@react-router/dev/routes";
import { index, route, layout } from "@react-router/dev/routes";

export default [
  layout("layouts/Navbar.tsx", [
    index("routes/home.tsx"),
    route("cars", "routes/cars.tsx"),
    route("cars/:carId", "routes/carDetails.tsx"),
    route("electronics", "routes/electronics.tsx"),
    route("electronics/:electronicsId", "routes/electronicsDetails.tsx"),
    route("new", "routes/new.tsx"),
    route("basket", "routes/basket.tsx"),
  ]),
] satisfies RouteConfig;
