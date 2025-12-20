import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SendHorizontal } from "lucide-react";
import React from "react";
import type { MessageToSend } from "../../../types/message";
import { zodResolver } from "mantine-form-zod-resolver";
import { messageValidator } from "../../../utils/form";
import { useGetLoggedinUserQuery } from "../../../state/queries/user/userQuery";
import { useSendMessageMutation } from "../../../state/queries/user/messages/messageMutations";

export const MessageModel: React.FC = () => {
  const { data: sender } = useGetLoggedinUserQuery();
  const {data, isLoading} = useSendMessageMutation()

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { message: "" },
    validate: zodResolver(messageValidator),
  });
  const handleSendMessage = async (val: MessageToSend) => {
    try {
      const parsed = messageValidator.safeParse(val);

      console.log("val==>", parsed);
    } catch (error) {
      console.log("Error==>", error);
    }
  };
  return (
    <div className="flex flex-col h-full bg-gray-5000   ">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        <p>Chat with user {"userId"}</p>
        {/* Render messages here */}
      </div>
      <form onSubmit={form.onSubmit(handleSendMessage)} className=" flex items-center gap-7 py-2 px-7 ">
        <TextInput
          key={form.key("message")}
          {...form.getInputProps("message")}
          radius="xl"
          size="lg"
          className="flex-1"
        />
        <SendHorizontal type="submit" className="text-xl text-blue-400 right-9 " />
      </form>
    </div>
  );
};
