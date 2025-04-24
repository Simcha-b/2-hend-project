import { ArrowLeft, Upload } from "lucide-react";
import React from "react";
import { Form, redirect, useNavigate } from "react-router";
import { Button } from "~/components/ui/button";

export async function action({ request }: any) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  return redirect(`${data.category}`);
}
function New() {
  const navigate = useNavigate();
  const inputClass =
    "border mt-2 mt-2 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500";
  return (
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
        <Form
          method="post"
          className="flex flex-col gap-4 w-[90%] border rounded-2xl p-6"
        >
          <h1 className="text-1xl font-bold mb-2">פרטי המוצר</h1>
          <label className="flex flex-col">
            קטגוריה*
            <select name="category" id="" className={inputClass} required>
              <option value="cars">מכוניות</option>
              <option value="electronics">מוצרי אלקטרוניקה</option>
            </select>
          </label>
          <label className="flex flex-col">
            שם המוצר*
            <input
              type="text"
              name="productName"
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
            <div className="flex gap-3">
              <label htmlFor="new">חדש</label>
              <input
                type="checkbox"
                id="new"
                name="productCondition"
                className={inputClass}
                required
              />
              <label htmlFor="used">משומש</label>
              <input
                type="checkbox"
                id="used"
                name="productCondition"
                className={inputClass}
                required
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

          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-400 rounded-2xl p-6 cursor-pointer text-gray-600 hover:border-green-500 hover:bg-green-50 transition-all w-full max-w-sm">
            <Upload className="w-6 h-6 text-green-500" />
            <span>הוסף תמונות</span>
            <input
              type="file"
              name="productImage"
              accept="image/*"
              className="hidden"
            />
          </label>
          <div>
            <h1 className="text-1xl font-bold mb-2">פרטי המוכר</h1>
            <div className="flex">
              <label className="flex flex-col mr-2">
                שם מלא*
                <input
                  type="text"
                  name="firstName"
                  className={inputClass}
                  placeholder="שם פרטי"
                  required
                />
              </label>
              <label className="flex flex-col mr-2">
                טלפון*
                <input
                  type="tel"
                  name="phone"
                  className={inputClass}
                  placeholder="מספר טלפון"
                  required
                />
              </label>
            </div>
            <div className="flex gap-5 mt-2">
              <label className="flex flex-col">
                כתובת*
                <input
                  type="text"
                  name="address"
                  className={inputClass}
                  placeholder="כתובת"
                  required
                />
              </label>
              <label htmlFor="" className="flex flex-col">
                עיר*
                <input
                  type="text"
                  name="city"
                  className={inputClass}
                  placeholder="עיר"
                  required
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            הוסף מוצר
          </button>
        </Form>
      </div>
    </div>
  );
}

export default New;
