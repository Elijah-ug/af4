import { Button, Input, Loader } from "@mantine/core";
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
    mode: "uncontrolled",
    initialValues: { content: "", receiverId: 0 },
    validate: zodResolver(messageValidator),
  });
  const { user } = useParams();
  const { data, isLoading: loadUser } = useGetSingleUserQuery(Number(user), { skip: !user });
  const { data: friend, isLoading: loadFriennd } = useGetAllMessagesWithUserQuery(data?.newUser.id, { skip: !data });
  const { data: currentUser, isLoading: loadCurrentUser } = useGetLoggedinUserQuery();

  console.log("currentUser friend==>", friend?.them);

  const [sendMessage, { isLoading }] = useSendMessageMutation() as any;

  const handleSendMessage = async (values: MessageToSend) => {
    try {
      console.log("values==>", values);
      const parsed = messageValidator.safeParse({ ...values, receiverId: friend?.them });
      const res = await sendMessage(parsed.data);
      console.log("Response==>", res);
      return toast.success(res.data.message);
    } catch (error) {
      console.log("Error here==>", error);
      return toast.error("Message Not Sent");
    }
  };
  return (
    <div className="flex flex-col gap-7 pt-18 h-screen  sm:px-10">
      {loadUser || loadFriennd || loadCurrentUser ? (
        <Loader />
      ) : (
        <div className=" flex flex-col gap-3 py-3 flex-1 overflow-y-auto px-3 text-white">
          {friend ? (
            friend.messages.map((msg) => (
              <div className="">
                {/* <p>{msg.senderId}</p> */}
                <div
                  key={msg.id}
                  className={`flex  ${msg.senderId === currentUser?.newUser.id ? "justify-end " : "justify-start "}`}
                >
                  <span
                    className={`p-2 w-[40%]  ${
                      msg.senderId === currentUser?.newUser.id
                        ? "bg-gray-400 rounded-tl-2xl rounded-br-2xl"
                        : "bg-gray-500 rounded-tr-2xl rounded-bl-2xl"
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
