import React from "react";
import { useUserLikesQuery } from "../../../state/queries/user/userQuery";
import { ActiveUser } from "../loggedin/ActiveUser";

export const UserLikes: React.FC = () => {
  const { data, isLoading } = useUserLikesQuery();
//   console.log("User likes here==>", data);   
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-1 py-20">
        {data?.likers.map((user: any) => (
          <ActiveUser key={user.id} newUser={user} />
        ))}
      </div>
    </div>
  );
};
