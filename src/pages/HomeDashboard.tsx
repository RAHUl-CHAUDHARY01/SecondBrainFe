import { Card } from "../components/ui/Card";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import toast from "react-hot-toast";




export function HomeDashboard() {

   
  const { contents, refresh } = useContent();
  


  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        headers: { Authorization: localStorage.getItem("token") },
        data: { contentId: id },
      });

      if (response.status === 200) {
        toast.success("Content deleted successfully!", { position: "top-right" });
        refresh();
      } else {
        toast.error("Failed to delete content. Try again.");
      }
    } catch (error) {
      console.error("Error deleting content:", error);
      toast.error("Failed to delete content. Try again.");
    }
  };



    return (
        <div>
              

        {/* Content Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-6">
          {contents.map(({ type, link, title, _id }) => (
            <Card key={_id} type={type} link={link} title={title} contentId={_id} onDelete={handleDelete} />
          ))}
        </div>
        </div>
    )
}