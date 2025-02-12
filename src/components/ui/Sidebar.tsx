import { TwitterIcon } from "../../icons/TwitterIcon";
import { SidebarItem } from "./SidebarItem";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { Logo } from "../../icons/Logo";
import { Home, Menu } from "lucide-react";
import { Article } from "../../icons/Article";
import { useEffect } from "react";

export function Sidebar({ isOpen, toggleSidebar, setActiveSection }: { isOpen: boolean; toggleSidebar: () => void; setActiveSection: (section: string) => void }) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as HTMLElement).closest(".sidebar")) {
        toggleSidebar();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  // Function to trigger vibration
  const vibrateDevice = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate([200, 100, 200]); // Vibrates for 200ms, pauses 100ms, then vibrates 200ms
      console.log("Device vibration triggered!");
    } else {
      console.log("Vibration not supported on this device.");
    }
  };

  return (
    <div className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 sidebar 
      ${isOpen ? "w-48 md:w-52 shadow-lg" : "w-0 md:w-13 overflow-hidden"}`}
    >
      <div className="flex items-center justify-between text-lg md:text-2xl pt-4 px-4 font-semibold">
        {isOpen && (
          <div className="flex items-center">
            <div className="pr-2">
              <Logo />
            </div>
            <span className="text-sm md:text-lg">SecondBrain</span>
          </div>
        )}
        <button className="p-1" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
      </div>

      {isOpen && (
        <div>
          <div className="mt-10 pl-2 pt-8">
            <SidebarItem text="Home" icon={<Home />} onClick={() => setActiveSection("home")} />
          </div>
          <div className="pt-8 mt-10 pl-2">
            <SidebarItem text="Twitter" icon={<TwitterIcon />} onClick={() => setActiveSection("twitter")} />
            <SidebarItem text="Youtube" icon={<YoutubeIcon />} onClick={() => setActiveSection("youtube")} />
            
            {/* Vibrate when clicking "Article" */}
            <SidebarItem text="Article" icon={<Article />} onClick={() => { setActiveSection("article"); vibrateDevice(); }} />
          </div>
        </div>
      )}
    </div>
  );
}
