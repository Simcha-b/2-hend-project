import { ArrowLeft } from "lucide-react";
import React from "react";
import { Form } from "react-router";
import { Button } from "~/components/ui/button";

function New() {
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
        <Form method="post" className="flex flex-col gap-4 w-[90%] border rounded-2xl p-6">
          <label className="flex flex-col">
            *שם המוצר:
            <input
              type="text"
              name="productName"
              className="border p-2 rounded"
              placeholder="לדוגמא: טויוטה קאמרי 2019 או מקבוק פרו 16"
              required
            />
          </label>
          <label className="flex flex-col">
            *מחיר:
            <input
              type="text"
              name="productPrice"
              className="border p-2 rounded"
              placeholder="הכנס מחיר"
              required
            />
          </label>
          <label className="flex flex-col">
            *מצב:
            <input
              type="checkbooks"
              name="productCondition"
              className="border p-2 rounded"
              placeholder="הכנס מחיר"
              required
            />
          </label>
          <label className="flex flex-col">
            תיאור המוצר:
            <textarea
              name="productDescription"
              className="border p-2 rounded"
              rows={4}
              required
            ></textarea>
          </label>

          <label className="flex flex-col">
            מחיר:
            <input
              type="number"
              name="price"
              className="border p-2 rounded"
              min="0"
              step="0.01"
              required
            />
          </label>

          <label className="flex flex-col">
            תמונה:
            <input
              type="file"
              name="productImage"
              className="border p-2 rounded"
              accept="image/*"
            />
          </label>

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            הוסף מוצר
          </button>
        </Form>
      </div>
    </div>
  );
}

export default New;
