import React from "react";
import { LoggedinUser } from "./home/LoggedinUser";
import { AllUsers } from "./home/AllUsers";
import { Outlet } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen px-5 lg:px-10 py-18">
      <div className="">
        <LoggedinUser />
      </div>
      <div className="">
        <AllUsers />
      </div>
      <Outlet />
    </div>
  );
};
