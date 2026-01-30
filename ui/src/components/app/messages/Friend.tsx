import { Avatar, Button, Input, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SendHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { messageValidator } from "../../../utils/form";
import { zodResolver } from "mantine-form-zod-resolver";
import type { MessageToSend } from "../../../types/message";
import { useGetLoggedinUserQuery, useGetSingleUserQuery } from "../../../state/queries/user/userQuery";
import { useParams } from "react-router-dom";
import {
  useGetAllMessagesWithUserQuery,
  useSendMessageMutation,
} from "../../../state/queries/user/messages/messageQueries";
import { toast } from "react-toastify";
import { socket } from "../services/socket";
import { connectSocket } from "../../../utils/handlesockets";

export const Friend: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const typingTimeoutRef = React.useRef<any>(null);
  const form = useForm({
    mode: "controlled",
    initialValues: { content: "", receiverId: 0 },
    validate: zodResolver(messageValidator),
  });
  const { user } = useParams();
  const { data, isLoading: loadUser } = useGetSingleUserQuery(Number(user), { skip: !user });
  const { data: friend, isLoading: loadFriennd } = useGetAllMessagesWithUserQuery(data?.newUser.id, { skip: !data });
  const { data: currentUser, isLoading: loadCurrentUser } = useGetLoggedinUserQuery();

  // console.log("currentUser friend==>", friend);

  const [sendMessage, { isLoading }] = useSendMessageMutation() as any;

  // load api messages into state
  useEffect(() => {
    if (friend) {
      setMessages(friend.messages);
    }
  }, [friend]);

  // soccket connections to listen to incoming messages
  useEffect(() => {
    if (!currentUser || !friend) return;

    // talks to io.emit at the server
    socket.on("chat_message", (message) => {
      console.log("📩 realtime message:", message);
      setMessages((prev) => [...prev, message]);
    });

    const handleType = ({ senderId }: any) => {
      console.log("currentUser?.newUser.id", senderId);
      if (senderId !== currentUser?.newUser.id) {
        console.log("friend here");

        setIsTyping(true);
      }
    };
    const handleStopType = ({ senderId }: any) => {
      if (senderId !== currentUser?.newUser.id) {
        setIsTyping(false);
      }
    };
    // typing flag event
    socket.on("user_typing", handleType);
    // remove typing flag event
    socket.on("user_stop_typing", handleStopType);

    return () => {
      socket.off("chat_message");
      socket.off("user_typing", handleType);
      socket.off("user_stop_typing", handleStopType);
    };
  }, [friend, currentUser]);

  // handle typing

  const handleTyping = (value: string) => {
    form.setFieldValue("content", value);
    console.log("is user typing or==>", isTyping);

    socket.emit("typing", {
      senderId: currentUser?.newUser.id,
      receiverId: friend?.them,
    });

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", {
        senderId: currentUser?.newUser.id,
        receiverId: friend?.them,
      });
    }, 1500);
  };
  // console.log("Token==>", token);
  const handleSendMessage = async (values: MessageToSend) => {
    try {
      console.log("values==>", values);
      const parsed = messageValidator.safeParse({ ...values, receiverId: friend?.them });
      const res = await sendMessage(parsed.data);
      console.log("Response==>", res);
      // emit real time event to the server
      socket.emit("message", {
        newMsg: res.data.msg,
      });
      form.setFieldValue("content", "");
      return toast.success(res.data.message);
    } catch (error) {
      console.log("Error here==>", error);
      return toast.error("Message Not Sent");
    }
  };
  return (
    <div className="flex flex-col gap-1 pt-16 sm:pb-11 h-screen  sm:px-10 text-sm ">
      <div className="flex items-center text-xs gap-3 shadow-md px-3">
        <Avatar color="blue" alt="it's me" />
        {isTyping && <span className="text-xs text-green-400">{data?.newUser.username} is typing...</span>}
      </div>
      {loadUser || loadFriennd || loadCurrentUser ? (
        <Loader />
      ) : (
        <div className="flex-1 overflow-y-auto px-3 ">
          <div className=" flex flex-col gap-3 py-3 ">
            {friend ? (
              messages.map((msg) => (
                <div key={msg.id} className="">
                  {/* <p>{msg.senderId}</p> */}
                  <div
                    key={msg.id}
                    className={`flex  ${msg.senderId === currentUser?.newUser.id ? "justify-end " : "justify-start "}`}
                  >
                    <span
                      className={`p-2 min-w-[40%] max-w-[72%]  ${
                        msg.senderId === currentUser?.newUser.id
                          ? "bg-gray-500 rounded-tl-2xl rounded-br-2xl"
                          : "bg-gray-600 rounded-tr-2xl rounded-bl-2xl"
                      } `}
                    >
                      {msg.content}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <h3>No Messages yet!</h3>
            )}
          </div>
        </div>
      )}
      <form onSubmit={form.onSubmit(handleSendMessage)} className="flex items-center gap-7 pb-3 ">
        <Input
          value={form.values.content}
          onChange={(e) => handleTyping(e.currentTarget.value)}
          radius="xl"
          type="text"
          className=" w-full"
          size="lg"
        />
        <Button type="submit">
          {isLoading ? (
            <Loader color="" />
          ) : (
            <SendHorizontal type="submit" className="text-xl text-white right-9" size={24} />
          )}
        </Button>
      </form>
    </div>
  );
};
