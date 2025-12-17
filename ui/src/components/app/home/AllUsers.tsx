import React from "react";
import { useGetAllUsersQuery } from "../../../state/queries/user/userQuery";

export const AllUsers: React.FC = () => {
  const { data, isLoading } = useGetAllUsersQuery(undefined);
  console.log("Data here=>", data);
  return (
    <div>
      <div className="flex items-center gap-5">
        <span>Users online</span>
        <span>55</span>
      </div>
    </div>
  );
};
