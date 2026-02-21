import React from "react";
import { useGetAllUsersQuery } from "../../../state/queries/user/userQuery";
import { LoadingOverlay } from "@mantine/core";
import { User } from "./User";
import { ActiveUser } from "../loggedin/ActiveUser";

export const AllUsers: React.FC<any> = ({ searched, loadUsers }) => {
  const { data, isLoading } = useGetAllUsersQuery();

  return (
    <div className="lg:px-10">
      <div className="flex items-center gap-5">
        <span>All Users</span>
        <span>{searched?.users.length||data?.totalUsers }</span>
      </div>
      <div className="">
        {isLoading || loadUsers ? (
          <div className="">
            <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1 my-7">
            {searched
              ? searched.users.map((user: any) => <ActiveUser key={user.id} newUser={user} />)
              : data?.users.map((user) => <User key={user.id} newUser={user} />)}
          </div>
        )}
      </div>
    </div>
  );
};
