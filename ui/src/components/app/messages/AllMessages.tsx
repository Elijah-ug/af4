import React, { useState } from "react";
import { Message } from "./Message";
import { MessageModel } from "./MessageModel";
import { useParams } from "react-router-dom";
import { Image } from "@mantine/core";
import { useGetSingleUserQuery } from "../../../state/queries/user/userQuery";
import { useGetChatsQuery } from "../../../state/queries/user/messages/messageQueries";

export const AllMessages: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useParams<{ user: string | any }>();
  const id = Number(user);
  const { data: selectedUser } = useGetSingleUserQuery(id, { skip: !id }) as any;
  const { data: chats, isLoading } = useGetChatsQuery();
  // console.log("get all chats error==>", chats);
  const receiverId = selectedUser?.safe?.id;

  // console.log("all messages==>", allMessages);

  const openModel = () => {
    setIsOpen(true);
    console.log(isOpen);
  };
  // console.log("Me==>", me);
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-13 mb-20 py-13">
      {/* show senders side bar */}
      <div className="grid gap-2  p-3 ">
        {!isLoading &&
          chats &&
          chats.chat.map((msg) => <Message key={msg.id} msg={msg} openModel={() => openModel()} />)}
      </div>
      {/* messaging area for large screens */}
      <div className="hidden sm:flex sm:col-span-2 lg:col-span-3 ">
        <div className="flex flex-col items-center justify-between w-full">
          <div className="flex items-center bg-gray-400">
            <div className="pt-3 flex items-center gap-5">
              <Image
                radius="50%"
                h={50}
                w="50"
                fit="cover"
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
              />
              <p>{selectedUser?.safe?.username || "no user selected"}</p>
            </div>
          </div>
          <div className="w-full h-full bg-amber-400 mt-3">
            <MessageModel id={id} receiverId={receiverId} />
          </div>
        </div>
      </div>
    </div>
  );
};
