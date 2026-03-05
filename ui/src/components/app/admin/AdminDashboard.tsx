import React from "react";
import { SideNav } from "./SideNav";
import { Avatar, Indicator } from "@mantine/core";
import { Outlet } from "react-router-dom";

export const AdminDashboard: React.FC = () => {
  return (
    <div>
      <div className="h-screen">
        {/* top nav */}
        <div className=" shadow-lg flex items-center justify-between p-3">
          <span className="rounded-full bg-green-400 text-gray-500 font-semibold text-sm p-2">AF4</span>
          <Indicator position="bottom-start" offset={6}>
            <Avatar src="image.png" className="cursor-pointer" />
          </Indicator>
        </div>
        <div className="h-full flex gap-7">
          <SideNav />
          <div className="py-6 flex-1 px-12">
            <Outlet />
          </div>
        </div>  
        {/* main */}
        <div className="">
          {/* sidebard */}

          {/* main content */}
        </div>
      </div>
    </div>
  );
};
