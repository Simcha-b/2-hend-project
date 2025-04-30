import {
  getAllMakes,
  getCarsYears,
  getPriceRange,
  getProductByCategory,
} from "../data/db";
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
import { Search, SearchIcon } from "lucide-react";

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
    fromYear: category === "cars" ? query.get("fromYear") : undefined,
    toYear: category === "cars" ? query.get("toYear") : undefined,
  };

  const allMakes = await getAllMakes(category);
  const allYears = category === "cars" ? await getCarsYears() : [];
  const { minPrice, maxPrice: maxAvailablePrice } = await getPriceRange(
    category
  );
  const data = await getProductByCategory(category, filters);
  return {
    products: data,
    allMakes,
    allYears,
    category,
    q,
    minAvailablePrice: minPrice,
    maxAvailablePrice,
  };
}

function productList({ loaderData }: Route.ComponentProps) {
  const { products, allMakes, allYears, category, q, maxAvailablePrice } =
    loaderData;
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
      <h1 className="text-2xl mt-2 p-3 font-bold">{titleMap[category]}</h1>
      {/* חיפוש */}
      <div className="flex justify-center">
        <Form
          method="get"
          onChange={(event) => {
            const isFirstSearch = q === null;
            submit(event.currentTarget, {
              replace: !isFirstSearch,
            });
          }}
        >
          <div className="relative w-2xl">
            <Search
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="search"
              placeholder="חיפוש..."
              id="q"
              name="q"
              defaultValue={q || ""}
              className="pl-10 pr-10"   
            />
          </div>
        </Form>
      </div>
      <div className="flex">
        {allMakes?.length > 0 && (
          <div className="w-80 flex flex-col gap-6 mr-6 pl-6 border-l ">
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
                {category === "cars" && allYears.length > 0 && (
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1">
                      <AccordionTrigger>שנת ייצור</AccordionTrigger>
                      <AccordionContent>
                        <div className="flex justify-between gap-4 p-4 border">
                          <div className="flex flex-col gap-4 ">
                            <label htmlFor="">משנה:</label>
                            <select
                              name="fromYear"
                              id=""
                              className="w-full border border-gray-300 rounded-md p-4 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                            >
                              {allYears.map((year) => (
                                <option
                                  key={year}
                                  value={year}
                                  className="text-sm"
                                >
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col gap-4">
                            <label htmlFor="">עד שנה:</label>
                            <select
                              name="toYear"
                              id=""
                              defaultValue={allYears[allYears.length - 1]}
                              className="w-full  border border-gray-300 rounded-md p-4 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
                            >
                              {allYears.map((year) => (
                                <option
                                  key={year}
                                  value={year}
                                  className="text-sm"
                                >
                                  {year}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                )}
              </Form>
            </div>
          </div>
        )}
        <div className="mx-auto p-2 ml-4 mr-4">
          <div className="m-2 text-md">מציג {products.length} תוצאות</div>
          {products.length <= 0 && <div>נא אפס את הסינונים</div>}
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
