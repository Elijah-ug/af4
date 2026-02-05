import React from "react";
import { Badge, Divider, Loader } from "@mantine/core";
import { Link } from "react-router-dom";
import type { MessageRequest } from "../../../types/message";
import { useGetAllUsersQuery, useGetSingleUserQuery } from "../../../state/queries/user/userQuery";

type Options = {
  openModel: () => void;
  msg: MessageRequest;
};

export const Message: React.FC<Options> = ({ msg, openModel }) => {
  const { data: senders, isLoading: loadingSender } = useGetAllUsersQuery();
  const { data, isLoading } = useGetSingleUserQuery(msg?.receiverId, { skip: !msg?.receiverId });
  // console.log(" all mapped messages==>", msg);

  return (
    <div className="">
      {isLoading || loadingSender ? (
        <Loader color="green" />
      ) : (
        <div>
          {senders?.users.map((sender) => (
            <Link
              key={sender.id}
              to={`/friend/${sender.id}`}
              className="flex items-center gap-3 p-2"
              onClick={openModel}
            >
              <div className="bg-gray-500 w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-lg ">
                <span>{sender.name.slice()[0]}</span>
              </div>
              <div className="">
                <span>{sender.username}</span>
              </div>

              {false && (
                <Badge size="lg" circle>
                  2
                </Badge>
              )}
            </Link>
          ))}

          <Divider size="xs" />
        </div>
      )}
    </div>
  );
};
