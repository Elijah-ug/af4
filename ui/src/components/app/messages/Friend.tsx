import { Input } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SendHorizontal } from "lucide-react";
import React from "react";
import { messageValidator } from "../../../utils/form";
import { zodResolver } from "mantine-form-zod-resolver";
import type { MessageToSend } from "../../../types/message";
import { useSendMessageMutation } from "../../../state/queries/user/messages/messageMutations";

export const Friend: React.FC = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { content: "", receiverId: 0 },
    validate: zodResolver(messageValidator),
  });
  const [sendMessage, { isLoading }] = useSendMessageMutation() as any;

  const messages = [
    { user: "Sender", msg: "Hello from sender, This' sender" },
    { user: "Receiver", msg: "Hello from Receiver, This' Receiver" },
  ];
  const handleSendMessage = async (values: MessageToSend) => {
    try {
      console.log("values==>", values);
      const parsed = messageValidator.safeParse(values);
      const res = await sendMessage(parsed.data);
      console.log("Response==>", res);
    } catch (error) {
      console.log("Error here==>", error);
    }
  };
  return (
    <div className="flex flex-col justify-between py-7 h-screen bg-gray-600 px-3  sm:px-10 ">
      <div className="flex flex-col gap-3 py-3 ">
        {messages.map((message, i) => (
          <div className=" text-white">
            <div key={i} className={`flex  ${message.user === "Sender" ? "justify-end " : "justify-start "}`}>
              <span
                className={`p-2  ${
                  message.user === "Sender"
                    ? "bg-gray-500 rounded-tl-2xl rounded-br-2xl"
                    : "bg-gray-500 rounded-tr-2xl rounded-bl-2xl"
                } `}
              >
                {message.msg}
              </span>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={form.onSubmit(handleSendMessage)} className=" flex items-center gap-7 ">
        <Input
          key={form.key("content")}
          {...form.getInputProps("content")}
          radius="xl"
          type="text"
          className="border-gray-300 border-4 w-full"
          size="lg"
        />
        <SendHorizontal type="submit" className="text-xl text-blue-400 right-9" size={24} />
      </form>
    </div>
  );
};
