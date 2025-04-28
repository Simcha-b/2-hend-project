import { getAllMakes, getPriceRange, getProductByCategory } from "../data/db";
import Card from "../components/Card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import {
  Form,
  useSearchParams,
  useSubmit,
  type LoaderFunctionArgs,
} from "react-router";
import type { Route } from "./+types/productList";
import { Input } from "~/components/ui/input";
import { SearchIcon } from "lucide-react";

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
      <h1 className="text-2xl p-5 font-bold">{titleMap[category]}</h1>
      <div className="flex">
        {allMakes?.length > 0 && (
          <div className="w-64 flex flex-col gap-6 mr-6">
            {/* חיפוש */}
            <Form
              method="get"
              onChange={(event) => {
                const isFirstSearch = q === null;
                submit(event.currentTarget, {
                  replace: !isFirstSearch,
                });
              }}
            >
              <Input
                type="search"
                placeholder="חיפוש..."
                id="q"
                name="q"
                defaultValue={q || ""}
                className="border text-md"
              />{" "}
            </Form>
            {/* פילטרים */}
            <div>
              <div className="flex justify-between mb-5">
                <h2 className="font-bold m-2">סינון</h2>
                <Form method="get">
                  <button className="hover:cursor-pointer hover:bg-green-500 hover:text-white p-2 text-md rounded-2xl">
                    איפוס
                  </button>
                </Form>
              </div>
              <Form method="get" onChange={(e) => submit(e.currentTarget)}>
                <div className="border-b-1">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>מחיר</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col ">
                          <input
                            type="range"
                            name="maxPrice"
                            min={loaderData.minAvailablePrice}
                            max={loaderData.maxAvailablePrice}
                            step="20"
                            defaultValue={
                              searchParams.get("maxPrice") ||
                              loaderData.maxAvailablePrice
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
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="border-b-1">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>מצב מוצר</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-4 p-4 ">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="used"
                              value="true"
                              checked={searchParams.get("used") === "true"}
                            />
                            <span className="text-sm">משומש</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="new"
                              value="true"
                              checked={searchParams.get("new") === "true"}
                            />
                            <span className="text-sm">חדש</span>
                          </label>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
                <div className="border-b-1">
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>יצרן </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col gap-4 p-4">
                          <div className="max-h-60 overflow-y-auto pr-2">
                            {allMakes.map((make) => (
                              <label
                                key={make}
                                className="flex items-center gap-2 mb-2"
                              >
                                <input
                                  type="checkbox"
                                  name="make"
                                  value={make}
                                  checked={isMakeSelected(make || "")}
                                />
                                <span className="text-sm">{make}</span>
                              </label>
                            ))}
                          </div>
                        </div>{" "}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </Form>
            </div>
          </div>
        )}
        <div className="max-w-5xl mx-auto">
          <div className="m-2 text-sm">מציג {products.length} תוצאות</div>
          <div className="grid md:grid-cols-4 gap-6">
            {/* הצגת המוצרים */}
            {products?.map((product: any) => (
              <Card key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default productList;
