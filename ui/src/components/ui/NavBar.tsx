// NavBar.tsx
import React from "react";
import { Home, MessageCircle, Compass, Bell, Settings, UsersRound, Moon, Sun } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useMantineColorScheme } from "@mantine/core";

export const NavBar: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <nav
      className={
        colorScheme === "dark"
          ? "fixed lg:bottom-0 left-0 right-0  shadow-md bg-gray-700 text-white border-gray-200 z-50 font-semibold px-3 lg:px-10 py-3"
          : "fixed lg:bottom-0 left-0 right-0  shadow-md  border-gray-200 z-50 font-semibold px-3 lg:px-10 py-3 bg-white"
      }
    >
      <div className="flex items-center justify-between gap-5 ">
        <div className="flex justify-between w-full lg:gap-7 items-center pr-3  py-2">
          {/* Home */}
          <NavLink to="/" className=" hover:text-pink-600 transition">
            <Home size={19} strokeWidth={2.5} />
          </NavLink>

          <NavLink to="active-users" className=" hover:text-pink-600 transition">
            <UsersRound size={19} strokeWidth={2.5} />
          </NavLink>

          {/* Messages */}
          <NavLink to="messages" className=" hover:text-pink-600 transition relative">
            <MessageCircle size={19} strokeWidth={2.5} />
            {/* Optional badge example */}
            {/* <span className="absolute top-1 right-3 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span> */}
          </NavLink>

          {/* Discover */}
          <NavLink to="discover" className=" hover:text-pink-600 transition">
            <Compass size={19} strokeWidth={2.5} />
          </NavLink>

          {/* Notifications */}
          <NavLink to="notifications" className=" hover:text-pink-600 transition relative">
            <Bell size={19} strokeWidth={2.5} />
            {/* Optional badge */}
            {/* <span className="absolute top-1 right-4 bg-red-500 text-white text-xs rounded-full w-4 h-4"></span> */}
          </NavLink>

          {/* Profile */}

          {/* <NavLink
            to="login"
            className=" hover:text-pink-600 transition"
          >
            <User size={19} strokeWidth={2.5} />
            <span className="text-xs mt-1 font-medium">Login</span>
          </NavLink> */}

          {/* Settings - placed at the end */}
          <NavLink to="settings" className=" hover:text-pink-600 transition">
            <Settings size={19} strokeWidth={2.5} />
          </NavLink>
        </div>
        <div
          className="lg:w-full lg:flex lg:items-center lg:justify-end transition-transform duration-300 "
          onClick={toggleColorScheme}
        >
          {colorScheme === "light" ? <Sun size={17} className="" /> : <Moon size={17} />}
        </div>
      </div>
    </nav>
  );
};
