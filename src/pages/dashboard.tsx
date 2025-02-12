import { useEffect, useState } from "react";
import { Button } from "../components/ui/Button";
import { Menu } from "lucide-react";
import { HomeDashboard } from "./HomeDashboard";
import { ArticleSection } from "../components/ui/ArticleSection";
import { TwitterSection } from "./TwitterSection";
import { Sidebar } from "../components/ui/Sidebar"; // Import Sidebar
import { YoutubeSection } from "./YoutubeSection";
import { BACKEND_URL } from "../config";
import axios from "axios";
import { toast } from "react-hot-toast";


import { Plus, Share2 } from "lucide-react";
import { useContent } from "../hooks/useContent";
import { CreateContentModal } from "../components/ui/CreateContentModal";
function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home"); // Track active section

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const [modalOpen, setModalOpen] = useState(false);
  const { contents, refresh } = useContent();
  
  useEffect(() => {
    refresh();
  }, [modalOpen, contents]);

  return (
    <div className="flex">
      {/* Sidebar with setActiveSection prop */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setActiveSection={setActiveSection} />

      <div className={`p-3 min-h-screen bg-gray-100 transition-all duration-300 flex-1 
        ${isSidebarOpen ? "md:ml-52" : "md:ml-13"}`}
      >
        {/* Sidebar Toggle Button (Mobile Only) */}
        <div className="md:hidden flex justify-between items-center">
          <Button onClick={toggleSidebar} variant="primary" size="md" startIcon={Menu} text="" />
        </div>


{/* Header */}
<div className="flex flex-col sm:flex-row justify-between items-center mt-4">
          <p className="text-lg sm:text-2xl font-semibold">
            Hello <span className="text-[#5046e4]">{localStorage.getItem("username")}</span>!
          </p>
          <div className="flex gap-2 mt-2 sm:mt-0">
            <Button
              variant="primary"
              size="md"
              text="Share Brain"
              startIcon={Share2}
              onClick={async () => {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/brain/share`,
                  { share: true },
                  { headers: { Authorization: localStorage.getItem("token") } }
                );

                const shareUrl = `http://localhost:5173/brain/share/${response.data.hash}`;
                await navigator.clipboard.writeText(shareUrl);
                toast.success("Link copied to clipboard!", { position: "top-right" });
              }}
            />
            <Button
              variant="secondary"
              size="md"
              text="Add Content"
              startIcon={Plus}
              onClick={() => setModalOpen(true)}
            />
          </div>
        </div>
        {/* Render active section dynamically */}
        {activeSection === "home" && <HomeDashboard />}
        {activeSection === "article" && <ArticleSection />}
        {activeSection === "twitter" && <TwitterSection />}
        {activeSection === "youtube" && <YoutubeSection />}
         <CreateContentModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </div>
    </div>
  );
}

export default Dashboard;
