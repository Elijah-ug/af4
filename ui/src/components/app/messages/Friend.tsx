import { Avatar, Button, Input, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SendHorizontal } from "lucide-react";
import React, { useEffect, useState } from "react";
import { messageValidator } from "../../../utils/form";
import { zodResolver } from "mantine-form-zod-resolver";
import type { MessageToSend } from "../../../types/message";
import { useGetLoggedinUserQuery } from "../../../state/queries/user/userQuery";
import { useParams } from "react-router-dom";
import {
  useGetAllMessagesQuery,
  useGetAllMessagesWithUserQuery,
  useGetChatsQuery,
  useSendMessageMutation,
} from "../../../state/queries/user/messages/messageQueries";
import { toast } from "react-toastify";
import { socket } from "../services/socket";

export const Friend: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  // refs so typing state survives re-renders
  const typingTimeoutRef = React.useRef<any>(null);
  const isTypingRef = React.useRef(false);

  const form = useForm({
    mode: "controlled",
    initialValues: { content: "", receiverId: 0 },
    validate: zodResolver(messageValidator),
  });
  const { user } = useParams();
  const userId = Number(user);
  console.log("User==>", user);
  const { data: friend, isLoading: loadFriennd } = useGetAllMessagesWithUserQuery(userId, { skip: !user });
  const { data: dd } = useGetChatsQuery();
  console.log("useGetAllMessagesWithUserQuery ==>", friend);

  const { data: currentUser, isLoading: loadCurrentUser } = useGetLoggedinUserQuery();

  const [sendMessage, { isLoading }] = useSendMessageMutation() as any;

  // load api messages into state once
  useEffect(() => {
    if (friend?.messages) {
      setMessages(friend.messages);
    }
  }, [friend?.messages]);

  // Socket listeners (stable, single registration)
  useEffect(() => {
    if (!currentUser) return;

    // talks to io.emit at the server
    // socket.on("message", (message) => {
    //   console.log("📩 realtime message:", message);
    //   setMessages((prev) => [...prev, message]);
    // });

    const onChatMessage = (message: any) => {
      setMessages((prev) => [...prev, message]);
    };

    const onUserTyping = ({ senderId }: any) => {
      console.log("currentUser?.newUser.id", senderId);
      if (senderId !== currentUser?.newUser.id) {
        console.log("friend here");
        setIsTyping(true);
      }
    };
    const onUserStopType = ({ senderId }: any) => {
      if (senderId !== currentUser?.newUser.id) {
        setIsTyping(false);
      }
    };

    // ======= matching server events ======
    // typing flag event
    socket.on("chat_message", onChatMessage);
    socket.on("user_typing", onUserTyping);
    // remove typing flag event
    socket.on("user_stop_typing", onUserStopType);

    return () => {
      socket.off("chat_message", onChatMessage);
      socket.off("user_typing", onUserTyping);
      socket.off("user_stop_typing", onUserStopType);
    };
  }, [friend, currentUser]);

  // typing handler with debounce (no spamming the server)
  const handleTyping = (value: string) => {
    form.setFieldValue("content", value);
    console.log("is user typing or==>", isTyping);

    if (!isTypingRef.current) {
      socket.emit("typing", {
        senderId: currentUser?.newUser.id,
        receiverId: friend?.them,
      });
      isTypingRef.current = true;
    }

    clearTimeout(typingTimeoutRef.current);

    typingTimeoutRef.current = setTimeout(() => {
      socket.emit("stop_typing", {
        senderId: currentUser?.newUser.id,
        receiverId: friend?.them,
      });
    }, 1500);
  };
  // send message with no state updates
  const handleSendMessage = async (values: MessageToSend) => {
    try {
      console.log("values==>", values);
      const parsed = messageValidator.safeParse({ ...values, receiverId: friend?.them });
      console.log("Parsed==>", parsed);
      const res = await sendMessage(parsed.data);
      console.log("Response==>", res);
      // if (res.msg) {
      //   setMessages((prev) => [...prev, res.msg]);
      // }

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
    <div className="flex flex-col gap-1 pt-16 sm:pb-11 min-h-screen  sm:px-10 text-sm">
      <div className="flex items-center text-xs gap-3 shadow-md px-3 py-1.5">
        <Avatar color="blue" alt="it's me" />
        {isTyping && <span className="text-xs text-green-400">{currentUser?.newUser.username} is typing...</span>}
      </div>
      {loadCurrentUser ? (
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
                      className={`p-2 sm:p-3 min-w-[40%] max-w-[72%]  ${
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
      <form onSubmit={form.onSubmit(handleSendMessage)} className="flex items-center gap-7 pb-3 sm:pb-7 ">
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
