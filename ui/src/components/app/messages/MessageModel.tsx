import { useForm } from "@mantine/form";
import { SendHorizontal } from "lucide-react";
import React from "react";

export const MessageModel:React.FC = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { text: "" },
    validate: { text: (val) => (val.length > 100 ? "Too long text" : null) },
  });
  return (
    <div className="flex flex-col h-full  bg-gray-300 ">
      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-4">
        <p>Chat with user {"userId"}</p>
        {/* Render messages here */}
      </div>
      <form onSubmit={form.onSubmit(console.log)} className=" flex items-center py-2 px-7 gap-3">
        <input type="text" className="border w-full h-12 focus:outline-none focus:ring-0 rounded-2xl px-5" />
        <SendHorizontal className="text-xl text-blue-400 " /> 
        {/* <Group grow className=" w-full">
          <TextInput key={form.key("name")} {...form.getInputProps("name")}  mt="md" />
        </Group>
        <Button type="submit" mt="sm">
          <SendHorizontal />
        </Button> */}
      </form>
    </div>
  );
};
