import React, { useEffect } from "react";
import { useReadLikesMutation, useUnreadLikesQuery, useUserLikesQuery } from "../../../state/queries/user/userQuery";
import { ActiveUser } from "../loggedin/ActiveUser";
import { User } from "../home/User";

export const UserLikes: React.FC = () => {
  const { data, isLoading } = useUserLikesQuery();
  const { data: likes } = useUnreadLikesQuery();
  const [readMsg] = useReadLikesMutation();

  console.log("User likes here==>", data);
  // read unread likes here
  useEffect(() => {
    if (likes?.unreadLikes > 0) {
      const readThem = async () => {
        const res = await readMsg();
        return res;
      };
      readThem();
    }
  }, [likes]);
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1 py-20">
        {!isLoading && data?.users.map((user: any) => <User key={user.id} newUser={user} />)}
      </div>
    </div>
  );
};
