import { AlertCircle, House, Mail, Settings, Users } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const SideNav: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | any>(null);

  const items = [
    { to: "", icon: House, txt: "Trends" },
    { to: "platform-users", icon: Users, txt: "Users" },
    { to: "mails", icon: Mail, txt: "Messages" },
    { to: "banned-users", icon: AlertCircle, txt: "Restricted" },
    { to: "admin-settings", icon: Settings, txt: "Settings" },
  ];
  return (
    <div className="bg-gray-600 h-full w-44 max-w-xs p-3 flex flex-col gap-5">
      {items.map((item, i) => (
        <Link
          key={i}
          to={item.to}
          onClick={() => setActiveIndex(i)}
          className={`flex items-center gap-2 text-sm hover:bg-white/10 p-2 rounded-lg ${activeIndex === i ? "bg-white/10" : ""} `}
        >
          <item.icon />
          <span>{item.txt}</span>
        </Link>
      ))}
    </div>
  );
};
