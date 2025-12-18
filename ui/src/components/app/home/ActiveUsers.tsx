import React, { useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../../../state/queries/user/userQuery";
import { LoadingOverlay } from "@mantine/core";
import { ActiveUser } from "./ActiveUser";

export const ActiveUsers: React.FC = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    if (data) {
      setTotal(data?.totalUsers);
    }
  }, [data]);
  return (
    <div>
      <div className="flex items-center gap-5">
        <span>Users online</span>
        <span>{total}</span>
      </div>
      <div className="">
        {isLoading ? (
          <div className="">
            <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1 my-7">
            {data?.users.map((user) => (
              <ActiveUser key={user.id} newUser={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
