import { Link } from "react-router";

export default function Home() {
  return (
    <div className="mt-9">
      <div className="mt-10 mb-10">
        <h1 className="text-center text-5xl font-bold font-sans mb-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
          Drive & Device
        </h1>
        <h4 className="text-center">
          מצאו עסקאות מדהימות על רכבים ומוצרי אלקטרוניקה משומשים, או מכרו את
          הפריטים שלכם לקהילת הקונים שלנו.
        </h4>
      </div>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Link to={"/cars"}>
          <div className="rounded-lg shadow-sm category-card h-80 overflow-hidden relative group transform transition-transform duration-300 hover:-translate-y-2">
            {" "}
            <div className="absolute inset-0 bg-gray-900 opacity-40 group-hover:opacity-50 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <div className="flex justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="120"
                  height="120"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-car text-white z-10"
                >
                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                  <circle cx="7" cy="17" r="2"></circle>
                  <path d="M9 17h6"></path>
                  <circle cx="17" cy="17" r="2"></circle>
                </svg>
              </div>
              <h2 className="text-2xl text-white font-bold mb-2">רכבים</h2>
              <p className="text-white">מצאו את הרכב הבא שלכם</p>
            </div>
          </div>
        </Link>
        <Link to={"/electronics"}>
          <div className="rounded-lg shadow-sm category-card h-80 overflow-hidden relative group transform transition-transform duration-300 hover:-translate-y-2">
            <div className="absolute inset-0 bg-gray-900 opacity-40 group-hover:opacity-50 transition-opacity"></div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <div className="flex justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="120"
                  height="120"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="items-center text-white z-10"
                >
                  <rect width="16" height="16" x="4" y="4" rx="2"></rect>
                  <rect width="6" height="6" x="9" y="9" rx="1"></rect>
                  <path d="M15 2v2"></path>
                  <path d="M15 20v2"></path>
                  <path d="M2 15h2"></path>
                  <path d="M2 9h2"></path>
                  <path d="M20 15h2"></path>
                  <path d="M20 9h2"></path>
                  <path d="M9 2v2"></path>
                  <path d="M9 20v2"></path>
                </svg>
              </div>
              <h2 className="text-2xl text-white font-bold mb-2">אלקטרוניקה</h2>
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
