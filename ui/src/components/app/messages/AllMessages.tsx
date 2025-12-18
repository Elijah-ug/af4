import React, { useState } from "react";
import { Message } from "./Message";
import { MessageModel } from "./MessageModel";

export const AllMessages: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  let staticSender: number[] = [];
  for (let i = 0; i <= 15; i++) {
    staticSender.push(i);
  }
  const openModel = (userId: number) => {
    setIsOpen(true);
    console.log("userId==>", userId);
  };
  console.log("Arr==>", staticSender);
  return (
    <div className="grid sm:grid-cols-2 gap-13">
      {/* show senders side bar */}
      <div className="grid gap-2  p-3 w-full">
        {staticSender.map((user, i) => (
          <Message nuser={user} openModel={() => openModel(i)} />
        ))}
      </div>
      {/* messaging area for large screens */}
      <div className="hidden sm:flex w-full">
        {isOpen ? (
          <div className="w-full">
            <MessageModel />
          </div>
        ) : (
          <div className="flex items-center justify-center py-50">
            <p>Start a chat</p>
          </div>
        )}
      </div>
    </div>
  );
};
