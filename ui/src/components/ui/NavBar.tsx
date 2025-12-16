// NavBar.tsx
import React from "react";
import { Home, MessageCircle, Compass, Bell, User, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

export const NavBar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md border-t border-gray-200 z-50 font-semibold">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-around items-center py-2">
          {/* Home */}
          <NavLink to="/" className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-pink-600 transition">
            <Home size={28} strokeWidth={2.5} />
            <span className="text-xs mt-1 font-medium">Home</span>
          </NavLink>

          {/* Discover */}
          <NavLink
            to="discover"
            className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-pink-600 transition"
          >
            <Compass size={28} strokeWidth={2} />
            <span className="text-xs mt-1 font-medium">Discover</span>
          </NavLink>

          {/* Messages */}
          <NavLink
            to="messages"
            className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-pink-600 transition relative"
          >
            <MessageCircle size={28} strokeWidth={2} />
            <span className="text-xs mt-1 font-medium">Messages</span>
            {/* Optional badge example */}
            {/* <span className="absolute top-1 right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span> */}
          </NavLink>

          {/* Notifications */}
          <NavLink
            to="notifications"
            className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-pink-600 transition relative"
          >
            <Bell size={28} strokeWidth={2} />
            <span className="text-xs mt-1 font-medium">Notifications</span>
            {/* Optional badge */}
            {/* <span className="absolute top-1 right-4 bg-red-500 text-white text-xs rounded-full w-4 h-4"></span> */}
          </NavLink>

          {/* Profile */}
          <NavLink
            to="login"
            className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-pink-600 transition"
          >
            <User size={28} strokeWidth={2} />
            <span className="text-xs mt-1 font-medium">Login</span>
          </NavLink>

          {/* Settings - placed at the end */}
          <NavLink
            to="settings"
            className="flex flex-col items-center py-2 px-4 text-gray-600 hover:text-pink-600 transition"
          >
            <Settings size={28} strokeWidth={2} />
            <span className="text-xs mt-1 font-medium">Settings</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};
