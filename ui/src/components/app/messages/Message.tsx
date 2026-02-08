import React from "react";
import { Badge, Divider, Loader } from "@mantine/core";
import { Link } from "react-router-dom";
import type { Chat } from "../../../types/message";
import { useUpdateMyChatsMutation } from "../../../state/queries/user/messages/messageQueries";
import { useGetLoggedinUserQuery } from "../../../state/queries/user/userQuery";
import type { SafeUser } from "../../../types/types";

type Options = {
  openModel: () => void;
  msg:ChatRequest;
};

export const Message: React.FC<Options> = ({ msg, openModel }) => {
  const [updateChats, { isLoading }] = useUpdateMyChatsMutation();
  const { data: currentUser, isLoading: loadCurrentUser } = useGetLoggedinUserQuery();
  // console.log("currentUser here==>", currentUser);
  // console.log(" all mapped user==>", msg);

  return (
    <div className="">
      {!msg ? (
        <Loader color="green" />
      ) : (
        <div>
          <Link key={msg.id} to={`/friend/${msg.id}`} className="flex items-center gap-3 p-2" onClick={openModel}>
            <div className="bg-gray-500 w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-lg ">
              <span>
                {msg.name.slice()[0]}
                {/* {msg?.userId === currentUser?.newUser.id ? msg?.friend.name.slice()[0] : msg?.user.name.slice()[0]} */}
              </span>
            </div>
            <div className="">
              <span>
                {/* {msg?.userId === currentUser?.newUser.id ? msg?.friend.username : msg?.user.username} */}
                {msg.username}
              </span>
              <span>{msg?.userId}</span>
            </div>
            {false && (
              <Badge size="lg" circle>
                2
              </Badge>
            )}
          </Link>

          <Divider size="xs" />
        </div>
      )}
    </div>
  );
};
