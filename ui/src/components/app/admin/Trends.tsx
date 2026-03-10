import React from "react";
import { AllUsers } from "./trends/AllUsers";
import { AllMails } from "./trends/AllMails";

export const Trends: React.FC = () => {
  return (
    <div>
      <div className="flex sm:flex-row gap-4">
          <AllUsers />
          <AllMails />
      </div>
    </div>
  );
};
