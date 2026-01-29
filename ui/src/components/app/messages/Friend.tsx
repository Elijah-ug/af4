import { Avatar, Button, Input, Loader } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SendHorizontal } from "lucide-react";
import React from "react";
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

export const Friend: React.FC = () => {
  const form = useForm({
    mode: "controlled",
    initialValues: { content: "", receiverId: 0 },
    validate: zodResolver(messageValidator),
  });
  const { user } = useParams();
  const { data, isLoading: loadUser } = useGetSingleUserQuery(Number(user), { skip: !user });
  const { data: friend, isLoading: loadFriennd } = useGetAllMessagesWithUserQuery(data?.newUser.id, { skip: !data });
  const { data: currentUser, isLoading: loadCurrentUser } = useGetLoggedinUserQuery();

  console.log("currentUser friend==>", data);

  const [sendMessage, { isLoading }] = useSendMessageMutation() as any;

  const handleSendMessage = async (values: MessageToSend) => {
    try {
      console.log("values==>", values);
      const parsed = messageValidator.safeParse({ ...values, receiverId: friend?.them });
      const res = await sendMessage(parsed.data);
      console.log("Response==>", res);
      form.setFieldValue("content", "");
      return toast.success(res.data.message);
    } catch (error) {
      console.log("Error here==>", error);
      return toast.error("Message Not Sent");
    }
  };
  return (
    <div className="flex flex-col gap-7 pt-18 h-screen  sm:px-10 text-sm">
      {loadUser || loadFriennd || loadCurrentUser ? (
        <Loader />
      ) : (
        <div className="flex-1 overflow-y-auto px-3 text-white">
          <div className="flex items-center text-xs gap-1 ">
            <Avatar color="blue" alt="it's me" />
            <span>{data?.newUser.username}</span>
          </div>
          <div className=" flex flex-col gap-3 py-3 ">
            {friend ? (
              friend.messages.map((msg) => (
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
          key={form.key("content")}
          {...form.getInputProps("content")}
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
