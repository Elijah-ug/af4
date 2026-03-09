import React, { useState } from "react";
import { useBanUserMutation, useGetAllUsersQuery } from "../../../state/queries/user/userQuery";
import { Loader, Tooltip } from "@mantine/core";
import { BadgeX } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Paginate } from "../pagination/Paginate";

export const PlatformUsers: React.FC = () => {
  const [loadingUserId, setLoadingUserId] = useState<number | null>(null);

  const [page, setPages] = useState<number>(1);

  const { data, isLoading } = useGetAllUsersQuery({ page, limit: 10 });
  const [banUser, { isLoading: loadBan }] = useBanUserMutation();
  console.log("Users==>", data);

  const handleBanUser = async (user: number) => {
    try {
      setLoadingUserId(user);
      const res = await banUser(user);
      console.log("User banned==>", res);
      if (res.data) {
        return toast.success(res.data.message as string);
      }
      console.log("User banned==>", res);
      return res;
    } catch (error) {
      console.log("Error==>", error);
      return toast.error("Failed to ban user");
    }
  };
  return (
    <div className="flex flex-col gap-1">
      {isLoading ? (
        <div className="">
          <Loader />
        </div>
      ) : data ? (
        data.users.data.map(
          (user) =>
            user.status !== "inactive" && (
              <div key={user.id} className="bg-gray-600 py-1 px-2 flex items-center justify-between rounded">
                <div className="flex gap-4 items-center">
                  <Link to={`/users/${user.id}`} className="hover:underline">
                    {user.name}
                  </Link>
                  <span>{user.gender}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-amber-500">{user.status}</span>
                  {/* <Edit className="text-blue-400 cursor-pointer" /> */}
                  {loadBan && loadingUserId === user.id ? (
                    <Loader />
                  ) : (
                    <Tooltip label="ban user">
                      <BadgeX onClick={() => handleBanUser(user.id)} className="text-red-400 cursor-pointer" />
                    </Tooltip>
                  )}
                </div>
              </div>
            ),
        )
      ) : (
        <div className="">No Users</div>
      )}
      {data && (
        <div className="flex items-center justify-center pt-6 ">
          <Paginate page={page} setPages={setPages} totalPages={(data as number | any)?.totalpages} />
        </div>
      )}
    </div>
  );
};
