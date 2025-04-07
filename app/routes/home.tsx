import { Link } from "react-router";

export default function Home() {
  return (
    <div className="mt-9">
      <div className="mt-10 mb-10">
        <h1 className="text-center text-3xl text-[##0d0d0d]">
          ברוכים הבאים לאתר הקניות החדשני ביותר
        </h1>
        <h4 className="text-center">
          מצאו עסקאות מדהימות על רכבים ומוצרי אלקטרוניקה משומשים, או מכרו את
          הפריטים שלכם לקהילת הקונים שלנו.
        </h4>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link to={"/cars"}>
          <div className="rounded-lg shadow-sm category-card h-80 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gray-900 opacity-40 group-hover:opacity-50 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h2 className="text-3xl text-white font-bold mb-2">רכבים</h2>
              <p className="text-white">מצאו את הרכב הבא שלכם</p>
            </div>
          </div>
        </Link>
        <Link to={"/electronics"}>
          <div className="rounded-lg shadow-sm category-card h-80 overflow-hidden relative group">
            <div className="absolute inset-0 bg-gray-900 opacity-40 group-hover:opacity-50 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h2 className="text-3xl text-white font-bold mb-2">אלקטרוניקה</h2>
              <p className="text-white">
                גלו עסקאות נהדרות על מוצרי אלקטרוניקה משומשים
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div className="text-center h-40 w-auto bg-green-50 p-6">
          <h2 className="text-2xl font-bold">מצאו עסקאות מעולות</h2>
          <p className="text-gray-600">
            קנו פריטים משומשים איכותיים במחירים שלא ישברו את הכיס.
          </p>
        </div>
        <div className="text-center h-40 w-auto bg-green-50 p-6">
          <h2 className="text-2xl font-bold">מכרו את הפריטים שלכם </h2>
          <p className="text-gray-600">
            הפכו את הפריטים שאינכם משתמשים בהם למזומן על ידי הצגתם בשוק שלנו.
          </p>
        </div>{" "}
        <div className="text-center h-40 w-auto bg-green-50 p-6">
          <h2 className="text-2xl font-bold">קניה בטוחה</h2>
          <p className="text-gray-600">
            הפלטפורמה שלנו מחברת בין קונים ומוכרים בסביבה בטוחה.
          </p>
        </div>
      </div>
    </div>
  );
}
