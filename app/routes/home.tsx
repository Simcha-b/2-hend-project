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
        <Link
          className="h-50 w-50 bg-[#ff8e3c] text-center cursor-pointer rounded-2xl text-2xl"
          to={"/cars"}
        >
          רכבים
        </Link>
        <Link
          className="h-50 w-50 bg-[#ff8e3c] text-center cursor-pointer rounded-2xl text-2xl"
          to={"/electronics"}
        >
          אלקטרוניקה
        </Link>
      </div>
    </div>
  );
}
