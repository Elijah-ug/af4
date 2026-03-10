import React, { useState } from "react";
import { SideNav } from "./SideNav";
import { Avatar, Indicator } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Admin } from "./Admin";

export const AdminDashboard: React.FC = () => {
  const [showProf, setShowProf] = useState<Boolean>(false);
  // console.log("showProf==>", showProf);
  return (
    <div>
      <div className="h-screen">
        {/* top nav */}
        <div className=" shadow-lg flex items-center justify-between p-3">
          <span className="rounded-full bg-green-400 text-gray-500 font-semibold text-sm p-2">AF4</span>
          <div className="relative">
            <Indicator position="bottom-start" offset={6}>
              <Avatar onClick={() => setShowProf((prev) => !prev)} src="image.png" className="cursor-pointer" />
            </Indicator>
            {showProf&&(<div className="absolute right-0 top-12">
              <Admin/>
            </div>)}
          </div>
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
