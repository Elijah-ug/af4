import React, { useState } from "react";
import { useBannedUsersQuery, useRemoveBanFromUserMutation } from "../../../state/queries/user/userQuery";
import { Loader, Tooltip } from "@mantine/core";
import { ArchiveRestore } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Paginate } from "../pagination/Paginate";

export const BannedUsers: React.FC = () => {
  const [loadingUserId, setLoadingUserId] = useState<number | null>(null);
  const [page, setPages] = useState<number>(1);

  const { data, isLoading } = useBannedUsersQuery({ page, limit: 10 });
  const [removeBan, { isLoading: loadBan }] = useRemoveBanFromUserMutation();
  console.log("User data==>", data);

  const handleBanUser = async (user: number) => {
    try {
      setLoadingUserId(user);
      const res = await removeBan(user);
      console.log("User banned==>", res);
      if (res.data) {
        return toast.success(res.data.message as string);
      }
      console.log("User banned==>", res);
      return res;
    } catch (error) {
      console.log("Error==>", error);
      return toast.error("Failed recover user");
    }
  };
  return (
    <div className="flex flex-col gap-1 text-red-300">
      {isLoading ? (
        <Loader />
      ) : data ? (
        data.users.data.map((user) => (
          <div key={user.id} className="bg-gray-600 py-1 px-2 flex items-center justify-between rounded">
            <div className="flex gap-4 items-center">
              <Link to={`/users/${user.id}`} className="line-through hover:underline">
                {user.name}
              </Link>
              <span>{user.gender}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="">{user.status}</span>
              {/* <Edit className="text-blue-400 cursor-pointer" /> */}
              {loadBan && loadingUserId === user.id ? (
                <Loader />
              ) : (
                <Tooltip label="recover user">
                  <ArchiveRestore onClick={() => handleBanUser(user.id)} className="text-green-400 cursor-pointer" />
                </Tooltip>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="">No banned User</div>
      )}
      {data && (
        <div className="flex items-center justify-center pt-6 ">
          <Paginate page={page} setPages={setPages} totalPages={(data as number | any)?.totalpages} />
        </div>
      )}
    </div>
  );
};
