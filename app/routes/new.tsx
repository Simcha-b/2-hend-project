import { ArrowLeft, Upload } from "lucide-react";
import React from "react";
import { Form, redirect, useFetcher, useNavigate } from "react-router";
import { Modal } from "~/components/Modal";
import { Button } from "~/components/ui/button";
import { addProduct } from "~/data/db";
import type { Product, Car, Electronics } from "~/types/products";

export async function action({ request }: any) {
  const formData = await request.formData();
  const images = formData.getAll("imagesBase64");
  const data = Object.fromEntries(formData);

  if (!data.name || !data.price || !data.productDescription) {
    return { success: false };
  }

  const baseProduct: Product = {
    id: Date.now().toString(),
    category: data.category,
    name: data.name,
    price: data.price,
    description: data.productDescription,
    condition: data.condition,
    model: data.model,
    features: data.features ? data.features.split(",") : [""],
    sellerInfo: {
      name: data.sellerName || "",
      email: data.sellerEmail || "",
      location: data.sellerLocation || "",
      contact: data.sellerContact || "",
    },
    addedAt: new Date().toLocaleString(),
    image: images as string[],
  };

  if (data.category === "cars") {
    const car: Car = {
      ...baseProduct,
      make: data.make,
      year: Number(data.year),
      Mileage: Number(data.mileage),
      color: data.color,
    };
    await addProduct(car);
  }

  if (data.category === "electronics") {
    const electronics: Electronics = {
      ...baseProduct,
      brand: data.make,
      specifications: parseSpecs(data.specifications),
    };
    await addProduct(electronics);
  }
  return {
    success: true,
    category: data.category,
  };
}

function parseSpecs(specString: string) {
  const specs = {};
  const entries = specString.split(",");
  entries.forEach((entry: string) => {
    const [key, value] = entry.split(":").map((s) => s.trim());
    if (key && value) {
      specs[key] = value;
    }
  });
  return specs;
}

function New() {
  const navigate = useNavigate();
  const fetcher = useFetcher();
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState("cars");

  const [imagesBase64, setImagesBase64] = React.useState<string[]>([]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
  
    const fileArray = Array.from(files);
  
    // בדיקה אם יחרוג מהמגבלה
    if (imagesBase64.length + fileArray.length > 5) {
      alert("אפשר לבחור עד 5 תמונות בלבד.");
      return;
    }
  
    const base64Promises = fileArray.map((file) => {
      return new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
    });
  
    const images = await Promise.all(base64Promises);
  
    setImagesBase64((prev) => [...prev, ...images]);  
  };
  const inputClass =
    "border mt-2 mt-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500";
  return (
    <>
      <div className="container mx-auto px-4 py-6 text-right">
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-4 text-gray-600"
        >
          חזרה
          <ArrowLeft size={16} className="mr-2 rtl:rotate-180" />
        </Button>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">פרסום מודעה</h1>
          <p className="text-gray-600 mb-6">
            מלא את הטופס כדי לפרסם את המוצר שלך למכירה
          </p>
          <fetcher.Form
            method="post"
            encType="application/x-www-form-urlencoded"
            className="flex flex-col gap-8 w-[90%] border rounded-2xl p-6 "
          >
            <label className="flex flex-col">
              קטגוריה*
              <select
                name="category"
                id=""
                className={inputClass}
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="cars">מכוניות</option>
                <option value="electronics">מוצרי אלקטרוניקה</option>
              </select>
            </label>
            <label className="flex flex-col">
              שם המוצר*
              <input
                type="text"
                name="name"
                className={inputClass}
                placeholder="לדוגמא: טויוטה קאמרי 2019 או מקבוק פרו 16"
                required
              />
            </label>
            <label className="flex flex-col">
              מחיר*
              <input
                type="number"
                name="price"
                className={inputClass}
                placeholder="הכנס מחיר"
                min="0"
                step="1"
                required
              />
            </label>
            <label className="flex flex-col">
              מצב*
              <div className="flex gap-2 mt-2 border p-2">
                <label htmlFor="new">חדש</label>
                <input type="checkbox" id="new" name="condition" className="" />
                <label htmlFor="used">משומש</label>
                <input
                  type="checkbox"
                  id="used"
                  name="productCondition"
                  className=""
                />
              </div>
            </label>
            <label className="flex flex-col">
              תיאור המוצר*
              <textarea
                name="productDescription"
                placeholder="רשום תיאור מוצר מפורט הכולל את כל המידע הרלוונטי"
                className={inputClass}
                rows={4}
                required
              ></textarea>
            </label>
            {category === "cars" ? (
              <div className="bg-gray-100 rounded-2xl p-4">
                <h1 className="text-1xl font-bold mb-2">פרטי רכב</h1>
                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                  <label htmlFor="make" className="flex flex-col">
                    יצרן*
                    <input
                      type="text"
                      name="make"
                      className={inputClass}
                      placeholder="לדוגמא: טויטה"
                      required
                    />
                  </label>
                  <label htmlFor="make" className="flex flex-col">
                    דגם*
                    <input
                      type="text"
                      name="model"
                      className={inputClass}
                      placeholder="לדוגמא: קאמרי "
                      required
                    />
                  </label>{" "}
                  <label htmlFor="make" className="flex flex-col">
                    שנת ייצור*
                    <input
                      type="number"
                      name="year"
                      className={inputClass}
                      placeholder="לדוגמא: 2019"
                      required
                    />
                  </label>
                  <label htmlFor="mileage" className="flex flex-col">
                    קילומטראז'*
                    <input
                      type="number"
                      name="mileage"
                      className={inputClass}
                      placeholder="לדוגמא: טויטה"
                      required
                    />
                  </label>
                  <label htmlFor="color" className="flex flex-col">
                    צבע*
                    <input
                      type="text"
                      name="color"
                      className={inputClass}
                      placeholder="לדוגמא: כחול"
                      required
                    />
                  </label>
                </div>
                <label htmlFor="make" className="flex flex-col mt-4">
                  תכונות
                  <textarea
                    name="features"
                    placeholder="רשום תכונות מרכזיות מופרדות בפסיקים (לדוגמא: מושבי עור, גג נפתח, מערכת ניווט)"
                    className={inputClass}
                    rows={4}
                    required
                  ></textarea>
                </label>
              </div>
            ) : (
              <div className="bg-gray-100 rounded-2xl p-4">
                <h1 className="text-1xl font-bold mb-2">
                  פרטי מוצרי אלקטרוניקה
                </h1>
                <div className="grid grid-cols-2 gap-4">
                  <label htmlFor="make" className="flex flex-col">
                    *יצרן
                    <input
                      type="text"
                      name="make"
                      className={inputClass}
                      placeholder="לדוגמא: אפל"
                      required
                    />
                  </label>
                  <label htmlFor="model" className="flex flex-col">
                    *דגם
                    <input
                      type="text"
                      name="model"
                      className={inputClass}
                      placeholder="לדוגמא: מקבוק פרו"
                      required
                    />
                  </label>
                </div>
                <label className="flex flex-col">
                  *תכונות
                  <textarea
                    name="features"
                    placeholder="רשום מפרט מרכזי (לדוגמה: מעבד: M1 Pro, זיכרון: 16GB, אחסון: 512GB)"
                    className={inputClass}
                    rows={4}
                    required
                  ></textarea>
                </label>
              </div>
            )}
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-400 rounded-2xl p-6 cursor-pointer text-gray-600 hover:border-green-500 hover:bg-green-50 transition-all w-full max-w-sm">
              <Upload className="w-6 h-6 text-green-500" />
              <span>הוסף תמונות (מקסימום 5)*</span>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {imagesBase64.map((base64, idx) => (
              <input
                key={idx}
                type="hidden"
                name="imagesBase64"
                value={base64}
              />
            ))}
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex flex-wrap gap-4 mt-4">
                {imagesBase64.map((base64, idx) => (
                  <div
                    key={idx}
                    className="relative w-32 h-32 rounded overflow-hidden border"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        setImagesBase64(
                          imagesBase64.filter((_, i) => i !== idx)
                        );
                      }}
                      className="absolute top-1 right-1 bg-red-200 text-white
                     rounded-full w-6 h-6 flex items-center justify-center text-sm
                      hover:bg-red-600 hover:cursor-pointer"
                    >
                      ×
                    </button>
                    <img
                      src={base64}
                      alt={`תמונה ${idx + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h1 className="text-1xl font-bold mb-2">פרטי המוכר</h1>
              <div className="grid grid-cols-2 grid-rows-2 gap-4">
                <label className="flex flex-col mr-2">
                  שם מלא*
                  <input
                    type="text"
                    name="sellerName"
                    className={inputClass}
                    placeholder="שם"
                    required
                  />
                </label>
                <label className="flex flex-col mr-2">
                  כתובת אימייל*
                  <input
                    type="email"
                    name="sellerEmail"
                    className={inputClass}
                    placeholder="אימייל"
                  />
                </label>
                <label className="flex flex-col mr-2">
                  טלפון*
                  <input
                    type="tel"
                    name="sellerContact"
                    className={inputClass}
                    placeholder="מספר טלפון"
                    required
                  />
                </label>
                <label className="flex flex-col">
                  מיקום*
                  <input
                    type="text"
                    name="sellerLocation"
                    className={inputClass}
                    placeholder="עיר"
                    required
                  />
                </label>
              </div>
            </div>
            <button
              type="submit"
              onClick={() => setOpen(true)}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 hover:scale-105 transition-all hover:cursor-pointer"
            >
              פרסם מודעה למכירה
            </button>
          </fetcher.Form>
        </div>
      </div>
      {fetcher.data?.success && (
        <Modal
          open={open}
          setOpen={setOpen}
          message={"!המוצר נוסף בהצלחה"}
          onClose={() => {
            navigate(`/${fetcher.data?.category}`);
          }}
        />
      )}
    </>
  );
}

export default New;
