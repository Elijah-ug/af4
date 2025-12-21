import React, { useState } from "react";
import { Message } from "./Message";
import { MessageModel } from "./MessageModel";
import { useParams } from "react-router-dom";
import { Image } from "@mantine/core";

export const AllMessages: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user } = useParams<{ user: string | any }>();
  const id = Number(user);
  console.log("receiver id==>", user);

  let staticSender: number[] = [];
  for (let i = 0; i <= 15; i++) {
    staticSender.push(i);
  }
  const openModel = () => {
    setIsOpen(true);
  };
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-3 gap-13 mb-20">
      {/* show senders side bar */}
      <div className="grid gap-2  p-3 ">
        {staticSender.map((user, i) => (
          <Message key={user} nuser={user} openModel={() => openModel(i)} />
        ))}
      </div>
      {/* messaging area for large screens */}
      <div className="hidden sm:flex sm:col-span-3 bg-amber-400">
        <div className="flex flex-col items-center justify-between w-full">
          <div className="flex items-center ">
            <div className="pt-3 flex items-center gap-5">
              <Image
                radius="50%"
                h={50}
                w="50"
                fit="cover"
                src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
              />
              <p>{user.username || "no user selected"}</p>
            </div>
          </div>

          <div className="w-full">
            <MessageModel id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};
