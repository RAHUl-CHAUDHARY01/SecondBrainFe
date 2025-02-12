import { ReactElement } from "react";

export function SidebarItem({ text, icon, onClick }: { text: string; icon: ReactElement; onClick?: () => void }) {
  return (
    <div 
      className="flex items-center text-gray-700 py-2 hover:bg-gray-200 rounded max-w-48 pl-4 transition-all duration-150 cursor-pointer"
      onClick={onClick} // Move onClick here!
    >
      <div className="pr-2">{icon}</div>
      <span>{text}</span>
    </div>
  );
}
