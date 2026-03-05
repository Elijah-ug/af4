import React from "react";
import { useBannedUsersQuery, useRemoveBanFromUserMutation } from "../../../state/queries/user/userQuery";
import { Loader, Tooltip } from "@mantine/core";
import { ArchiveRestore } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export const BannedUsers: React.FC = () => {
  const { data, isLoading } = useBannedUsersQuery();
  const [removeBan, { isLoading: loadBan }] = useRemoveBanFromUserMutation();

  const handleBanUser = async (user: number) => {
    try {
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
    <div className="flex flex-col gap-1">
      {isLoading ? (
        <Loader />
      ) : data ? (
        data.users.map((user) => (
          <div key={user.id} className="bg-gray-600 py-1 px-2 flex items-center justify-between rounded">
            <div className="flex gap-4 items-center text-gray-400">
              <Link to={`/users/${user.id}`} className="line-through">
                {user.name}
              </Link>
              <span>{user.gender}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-amber-500">{user.status}</span>
              {/* <Edit className="text-blue-400 cursor-pointer" /> */}
              {loadBan ? (
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
    </div>
  );
};
