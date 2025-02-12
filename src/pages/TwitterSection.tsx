import { useContent } from "../hooks/useContent";
import { Card } from "../components/ui/Card";

type Content = {
  type: "twitter" | "youtube" |"article";
  link: string;
  title: string;
  _id: string;
};

export function TwitterSection() {
  const { contents } = useContent() as { contents: Content[] };

  const content = contents.filter((item: Content) => item.type === "twitter");

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
        {content.length > 0 ? (
          content.map(({ type, link, title, _id }) => (
            <Card
              key={_id}
              type={type}
              link={link}
              title={title}
              contentId={_id}
              onDelete={() => {}} // Placeholder to avoid missing prop error
            />
          ))
        ) : (
          <p className="text-gray-500">No Twitter content available.</p>
        )}
      </div>
    </div>
  );
}
