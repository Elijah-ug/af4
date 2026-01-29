import { Loader, LoadingOverlay, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SendHorizontal } from "lucide-react";
import React from "react";
import type { MessageToSend } from "../../../types/message";
import { zodResolver } from "mantine-form-zod-resolver";
import { messageValidator } from "../../../utils/form";
import {
  useGetAllMessagesWithUserQuery,
  useSendMessageMutation,
} from "../../../state/queries/user/messages/messageQueries";

type Options = {
  id: number;
  receiverId: number | any;
};
export const MessageModel: React.FC<Options> = ({ receiverId }) => {
  // const { data: sender } = useGetLoggedinUserQuery();
  const [sendMessage, { isLoading }] = useSendMessageMutation() as any;
  const { data, isLoading: loadMsg } = useGetAllMessagesWithUserQuery(receiverId, { skip: !receiverId }) as any;
  console.log("User messages==>", data);
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { content: "", receiverId: 0 },
    validate: zodResolver(messageValidator),
  });
  const handleSendMessage = async (values: MessageToSend) => {
    try {
      if (!receiverId) {
        return console.log("User with id doesn't exist");
      }
      values.receiverId = receiverId;
      const parsed = messageValidator.safeParse(values);
      console.log("receiver is==>", parsed.data);
      const res = await sendMessage(parsed.data);
      console.log("Response==>", res);
      if (res.error && "data" in res.error) {
        const errMsg = (res.error.data as any)?.message;
        console.log("Err message==>", errMsg);
      }
      console.log("response is ==>", res);
      return res;
    } catch (error) {
      console.log("Error==>", error);
    }
  };
  return (
    <div className="flex flex-col h-full bg-gray-5000   ">
      <h3>Modle</h3>
      {/* Chat messages area */}
      {loadMsg ? (
        <Loader color="blue" />
      ) : (
        <div className="flex flex-col gap-2 w-full">
          {data &&
            data?.messages.map((msg: object | any) => (
              <div key={msg.id} className={`p-3 flex ${msg.sender === "sender" ? "justify-start " : "justify-end "}`}>
                <div
                  className={`w-[48%] p-3 text-white rounded-2xl ${
                    msg.sender === "sender" ? "bg-gray-500 rounded-bl-none" : "bg-blue-500 rounded-br-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
        </div>
      )}
      <div className="flex-1 overflow-y-auto p-4">{/* Render messages here */}</div>
      <form onSubmit={form.onSubmit(handleSendMessage)} className=" flex items-center gap-7 py-2 px-7 ">
        <TextInput
          key={form.key("content")}
          {...form.getInputProps("content")}
          radius="xl"
          size="xl"
          className="flex-1"
        />
        <SendHorizontal type="submit" className="text-xl text-blue-400 right-9 " />
        <div className="">
          <LoadingOverlay visible={isLoading} zIndex={1000} overlayProps={{ radius: "xs", blur: 2 }} />
        </div>
      </form>
    </div>
  );
};
