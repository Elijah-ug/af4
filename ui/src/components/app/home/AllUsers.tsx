import React, { useState } from "react";
import { useGetAllUsersQuery } from "../../../state/queries/user/userQuery";
import { LoadingOverlay } from "@mantine/core";
import { User } from "./User";
import { Paginate } from "../pagination/Paginate";

export const AllUsers: React.FC<any> = ({ searched, loadUsers }) => {
  const [page, setPages] = useState<number | any>(1);
  const { data, isLoading } = useGetAllUsersQuery({ page, limit: 20 });
  console.log("All users here", data);
  return (
    <div className="lg:px-10">
      <div className="flex items-center gap-5">
        <span>All Users</span>
        <span>{searched?.users.length || data?.totalUsers}</span>
      </div>
      <div className="">
        {isLoading || loadUsers ? (
          <div className="">
            <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1 my-7">
            {searched
              ? searched.users.data.map((user: any) => <User key={user.id} newUser={user} />)
              : data?.users.data.map((user) => <User key={user.id} newUser={user} />)}
          </div>
        )}
      </div>
      <div className="">
        <Paginate page={page} setPages={setPages} totalPages={data?.totalpages} />
      </div>
    </div>
  );
};
