import React from "react";
import { Badge, Divider, Image } from "@mantine/core";
import { Link } from "react-router-dom";
import type { MessageRequest } from "../../../types/message";
import {
  useGetAllUsersQuery,
  useGetLoggedinUserQuery,
  useGetSingleUserQuery,
} from "../../../state/queries/user/userQuery";
import { useGetAllMessagesWithUserQuery } from "../../../state/queries/user/messages/messageQueries";

type Options = {
  openModel: () => void;
  msg: MessageRequest;
};

export const Message: React.FC<Options> = ({ msg, openModel }) => {
  const { data: senders, isLoading: loadingSender } = useGetAllUsersQuery();
  const { data, isLoading } = useGetSingleUserQuery(msg?.receiverId, { skip: !msg?.receiverId });
  const { data: user, isLoading: loadChat } = useGetLoggedinUserQuery();
  // console.log("senders==>", senders);
  // console.log("User here==>", user?.safe.sentMessages);

  //   if()
  return (
    <div>
      {senders?.users.map(
        (user) =>
          user.id === data?.safe.id && (
            <Link to="/friend" className="flex items-center gap-7 p-2" onClick={openModel}>
              <div className="bg-gray-500 w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-lg ">
                <span>{user.name.slice()[0]}</span>
              </div>
              <div className="">
                <span>{user.username}</span>
              </div>

              {false && (
                <Badge size="lg" circle>
                  2
                </Badge>
              )}
            </Link>
          )
      )}

      <Divider size="xs" />
    </div>
  );
};
