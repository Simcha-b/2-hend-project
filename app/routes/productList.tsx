import { getAllMakes, getPriceRange, getProductByCategory } from "../data/db";
import Card from "../components/Card";
import {
  Form,
  useSearchParams,
  useSubmit,
  type LoaderFunctionArgs,
} from "react-router";
import type { Route } from "./+types/productList";

export async function loader({ request, params }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const query = url.searchParams;
  const q = url.searchParams.get("q");
  const category = params.category!;

  const makeFilters = query.getAll("make");
  const maxPrice = query.get("maxPrice");

  const filters = {
    q: query.get("q"),
    used: query.get("used") === "true",
    new: query.get("new") === "true",
    makes: makeFilters.length > 0 ? makeFilters : undefined,
    maxPrice: maxPrice ? parseFloat(maxPrice) : undefined,

  };

  const allMakes = await getAllMakes(category);
  const { minPrice, maxPrice: maxAvailablePrice } = await getPriceRange(
    category
  );
  const data = await getProductByCategory(category, filters);
  return {
    products: data,
    allMakes,
    category,
    q,
    minAvailablePrice: minPrice,
    maxAvailablePrice,
  };
}

function productList({ loaderData }: Route.ComponentProps) {
  const { products, allMakes, category, q, maxAvailablePrice } = loaderData;
  const submit = useSubmit();
  const [searchParams] = useSearchParams();

  const isMakeSelected = (make: string) => {
    return searchParams.getAll("make").includes(make);
  };

  const titleMap: Record<string, string> = {
    cars: "מכוניות יד שניה",
    electronics: "מוצרי אלקטרוניקה יד שניה",
  };

  return (
    <>
      <h1 className="text-center text-3xl p-5">{titleMap[category]}</h1>
      <div className="flex">
        {allMakes?.length > 0 && (
          <div className="w-64 flex flex-col gap-6 mr-6">
            <h2 className="text-lg font-bold text-gray-800 text-right">
              סינון
            </h2>
            <Form
              method="get"
              onChange={(event) => {
                const isFirstSearch = q === null;
                submit(event.currentTarget, {
                  replace: !isFirstSearch,
                });
              }}
            >
              <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-md bg-gray-50 mb-6">
                <input
                  type="search"
                  placeholder="הקלד כאן לחיפוש מוצר"
                  id="q"
                  name="q"
                  defaultValue={q || ""}
                  className="border bg-amber-50 text-md"
                />{" "}
              </div>
            </Form>

            <Form method="get" onChange={(e) => submit(e.currentTarget)}>
              <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-md bg-gray-50 mb-6">
                <h3 className="text-md font-semibold text-gray-700 border-b pb-2 text-right">
                  מחיר
                </h3>
                <input
                  type="range"
                  name="maxPrice"
                  min={loaderData.minAvailablePrice} 
                  max={loaderData.maxAvailablePrice}
                  step="20"
                  defaultValue={
                    searchParams.get("maxPrice") || loaderData.maxAvailablePrice
                  }
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₪{loaderData.minAvailablePrice}</span>{" "}
                  <span>
                    ₪
                    {searchParams.get("maxPrice") ||
                      loaderData.maxAvailablePrice}
                  </span>
                </div>
              </div>
            </Form>
            <Form method="get" onChange={(e) => submit(e.currentTarget)}>
              <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-md bg-gray-50 mb-6">
                <h3 className="text-md font-semibold text-gray-700 border-b pb-2 text-right">
                  מצב
                </h3>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="used"
                    value="true"
                    defaultChecked={searchParams.get("used") === "true"}
                  />
                  <span className="text-sm">משומש</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="new"
                    value="true"
                    defaultChecked={searchParams.get("new") === "true"}
                  />
                  <span className="text-sm">חדש</span>
                </label>
              </div>
              <div className="flex flex-col gap-4 p-4 border rounded-lg shadow-md bg-gray-50">
                <h3 className="text-md font-semibold text-gray-700 border-b pb-2 text-right">
                  יצרן
                </h3>
                <div className="max-h-60 overflow-y-auto pr-2">
                  {allMakes.map((make) => (
                    <label key={make} className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        name="make"
                        value={make}
                        defaultChecked={isMakeSelected(make)}
                      />
                      <span className="text-sm">{make}</span>
                    </label>
                  ))}
                </div>
              </div>
            </Form>
          </div>
        )}
        <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          {products?.map((product: any) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default productList;
