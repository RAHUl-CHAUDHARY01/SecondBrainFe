import React from "react";
import { useContent } from "../hooks/useContent";
import { Card } from "../components/ui/Card";

export function YoutubeSection() {
  const {contents, refresh} = useContent() || []; // Ensure contents is an array
  const content = contents.filter((item) => item?.type === "youtube"); // Add optional chaining for safety

  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
        {content.length > 0 ? (
          content.map(({ type, link, title, _id }) => (
            <Card key={_id} type={type} link={link} title={title} contentId={_id} />
          ))
        ) : (
          <p className="text-gray-500">No Youtube content available.</p>
        )}
      </div>
    </div>
  );
}
