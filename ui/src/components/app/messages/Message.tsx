import React from "react";
import { Badge, Divider, Loader } from "@mantine/core";
import { Link } from "react-router-dom";
import {
  useReadUserMessagesMutation,
  useUnreadMessagesQuery,
} from "../../../state/queries/user/messages/messageQueries";
import type { SafeUser } from "../../../types/types";

type Options = {
  chat: SafeUser;
};

export const Message: React.FC<Options> = ({ chat }) => {
const { data: newMsg, isLoading: loadNew } = useUnreadMessagesQuery();

  const [readUnread] = useReadUserMessagesMutation();

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
      {!chat ? (
        <Loader color="green" />
      ) : (
        <div>
          <Link key={chat.id} to={`/${chat.id}`} className="flex items-center gap-3 p-2" onClick={handleReadMessages}>
            <div className="bg-gray-500 w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-lg ">
              <span>
                {chat.name.slice()[0]}
                {/* {chat?.userId === currentUser?.newUser.id ? chat?.friend.name.slice()[0] : chat?.user.name.slice()[0]} */}
              </span>
            </div>
            <div className="">
              <span>
                {/* {chat?.userId === currentUser?.newUser.id ? chat?.friend.username : chat?.user.username} */}
                {chat.username}
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
