import React from "react";
import { Badge, Divider, Loader } from "@mantine/core";
import { Link } from "react-router-dom";
import {
  useGetAllMessagesWithUserQuery,
  useReadUserMessagesMutation,
  useUnreadMessagesQuery,
} from "../../../state/queries/user/messages/messageQueries";
import type { SafeUser } from "../../../types/types";

type Options = {
  openModel: () => void;
  msg: SafeUser;
};

export const Message: React.FC<Options> = ({ msg }) => {
  const { data: newMsg, isLoading: loadNew } = useUnreadMessagesQuery();

  const [readUnread] = useReadUserMessagesMutation();

  console.log(" all mapped messages==>", newMsg);
  const handleReadMessages = async () => {
    try {
      // if (texts && texts?.count > 0) {
      const res = await readUnread();
      console.log("Messages read==>", res);
      return res;
      // }
    } catch (error) {
      console.log("Read error==>", error);
    }
  };

  return (
    <div className="">
      {!msg ? (
        <Loader color="green" />
      ) : (
        <div>
          <Link key={msg.id} to={`/${msg.id}`} className="flex items-center gap-3 p-2" onClick={handleReadMessages}>
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
            </div>
            {!loadNew && newMsg && newMsg.unreadMsg > 0 && (
              <Badge size="lg" circle>
                {newMsg.unreadMsg}
              </Badge>
            )}
          </Link>

          <Divider size="xs" />
        </div>
      )}
    </div>
  );
};
