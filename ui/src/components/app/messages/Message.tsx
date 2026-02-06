import React from "react";
import { Badge, Divider, Loader } from "@mantine/core";
import { Link } from "react-router-dom";
import type { Chat } from "../../../types/message";

type Options = {
  openModel: () => void;
  msg: Chat;
};

export const Message: React.FC<Options> = ({ msg, openModel }) => {
  console.log(" all mapped user==>", msg);

  return (
    <div className="">
      {!msg ? (
        <Loader color="green" />
      ) : (
        <div>
          <Link key={msg.id} to={`/friend/${msg.user.id}`} className="flex items-center gap-3 p-2" onClick={openModel}>
            <div className="bg-gray-500 w-9 h-9 rounded-full flex items-center justify-center font-bold text-white text-lg ">
              <span>{msg?.user.name.slice()[0]}</span>
            </div>
            <div className="">
              <span>{msg?.user.username}</span>
              <span>{msg?.id}</span>
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
