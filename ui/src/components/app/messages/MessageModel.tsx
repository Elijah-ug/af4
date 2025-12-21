import { TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { SendHorizontal } from "lucide-react";
import React from "react";
import type { MessageToSend } from "../../../types/message";
import { zodResolver } from "mantine-form-zod-resolver";
import { messageValidator } from "../../../utils/form";
import { useGetLoggedinUserQuery, useGetSingleUserQuery } from "../../../state/queries/user/userQuery";
import { useSendMessageMutation } from "../../../state/queries/user/messages/messageMutations";

type Options = {
  id: number;
};
export const MessageModel: React.FC<Options> = ({ id }) => {
  // const { data: sender } = useGetLoggedinUserQuery();
  const { data, isLoading } = useSendMessageMutation();
  const { data: user } = useGetSingleUserQuery(id, { skip: !id });
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { content: "" },
    validate: zodResolver(messageValidator),
  });
  const handleSendMessage = async (val: MessageToSend) => {
    try {
      if (!user) {
        return console.log("User with id doesn't exist");
      }
      const receiverId = user.id;
      const parsed = messageValidator.safeParse(val);
      const allData = { ...parsed, receiverId };
      console.log("Receiver is==>", allData);
      //  const fullMsg = {parsed.message}
      console.log("receiverId==>", receiverId);
      // const

      console.log("val==>", parsed);
    } catch (error) {
      console.log("Error==>", error);
    }
  };
  return (
    <div className="flex flex-col h-full bg-gray-5000   ">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Render messages here */}
      </div>
      <form onSubmit={form.onSubmit(handleSendMessage)} className=" flex items-center gap-7 py-2 px-7 ">
        <TextInput
          key={form.key("content")}
          {...form.getInputProps("content")}
          radius="xl"
          size="xl"
          className="flex-1"
        />
        <SendHorizontal type="submit" className="text-xl text-blue-400 right-9 " />
      </form>
    </div>
  );
};
