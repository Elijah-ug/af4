import React from "react";
import { LoggedinUser } from "./home/LoggedinUser";
import { AllUsers } from "./home/AllUsers";

export const Home: React.FC = () => {
  return (
    <div>
      <div className="">
        <LoggedinUser />
      </div>
      <div className="">
        <AllUsers />
      </div>
    </div>
  );
};
