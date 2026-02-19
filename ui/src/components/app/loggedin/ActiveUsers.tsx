import React, { useEffect, useState } from "react";
import {
  useGetAllUsersQuery,
  useGetLoggedinUserQuery,
  useGetMatchesQuery,
  useUserLikesQuery,
} from "../../../state/queries/user/userQuery";
import { LoadingOverlay } from "@mantine/core";
import { ActiveUser } from "./ActiveUser";

export const ActiveUsers: React.FC = () => {
  const { data, isLoading } = useGetAllUsersQuery();
  const { data: currUser, isLoading: loadCurrUser } = useGetLoggedinUserQuery();

  const { data: matches } = useGetMatchesQuery();
  console.log("get all matches==>", matches);

  const { data: likers, isLoading: loadLikers } = useUserLikesQuery();
  // console.log("profile likers==>", likers);

  const [total, setTotal] = useState<number>(0);
  useEffect(() => {
    if (data) {
      setTotal(data?.totalUsers);
    }
  }, [data]);
  // console.log("all users==>", data);

  return (
    <div className=" lg:px-10 py-18">
      <div className="flex items-center gap-5 ">
        <span>See who liked your profile</span>
        <span>{total}</span>
      </div>
      <div className="">
        {isLoading ? (
          <div className="">
            <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1 my-7">
            {likers?.users.map(
              (user) => user.id !== currUser?.newUser.id && <ActiveUser key={user.id} newUser={user} />,
            )}
          </div>
        )}
      </div>
    </div>
  );
};
