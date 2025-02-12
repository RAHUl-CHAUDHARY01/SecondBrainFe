import { ArrowRightSquare } from "lucide-react";
import { useContent } from "../../hooks/useContent";
import { useNavigate } from "react-router-dom";

export function ArticleSection() {
  const { contents } = useContent(); // Fetch content
  const navigate = useNavigate();

  // Ensure contents is always an array
  const articles = Array.isArray(contents) ? contents.filter((item) => item?.type === "article") : [];

  return (
    <div className="p-6 mt-10">
      

      {articles.length > 0 ? (
        <ul className="space-y-4">
          {articles.map((article, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-200 transition-all duration-200 cursor-pointer"
            >
              <h3 className="font-semibold text-lg">{article.title}</h3>
              <ArrowRightSquare
                className="w-6 h-6 text-gray-600 hover:text-[#5046e4] transition-transform duration-200 hover:scale-110"
                onClick={() => window.open(article.link, "_blank")} // Opens link in a new tab
              />
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No articles available.</p>
      )}
    </div>
  );
}
