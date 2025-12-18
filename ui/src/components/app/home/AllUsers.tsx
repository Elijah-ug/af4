import React from "react";
import { useGetAllUsersQuery } from "../../../state/queries/user/userQuery";
import { LoadingOverlay } from "@mantine/core";
import { User } from "./User";

export const AllUsers: React.FC = () => {
  const { data, isLoading } = useGetAllUsersQuery();
 
  return (
    <div>
      <div className="flex items-center gap-5">
        <span>All Users</span>
        <span>35215</span>
      </div>
      <div className="">
        {isLoading ? (
          <div className="">
            <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1 my-7">
            {data?.users.map((user) => (
              <User key={user.id} newUser={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
