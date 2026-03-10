import React, { useState } from "react";
import { useDestroyInquiryMutation, useGetInquiriesQuery } from "../../../state/queries/user/inquiries";
import { Loader, Tooltip } from "@mantine/core";
import { Link } from "react-router-dom";
import { BadgeX } from "lucide-react";
import { toast } from "react-toastify";

export const Mails: React.FC = () => {
  const [loadingUserId, setLoadingUserId] = useState<number | null>();
  const { data, isLoading } = useGetInquiriesQuery();
  const [destroy, { isLoading: loadDestroy }] = useDestroyInquiryMutation();
  // console.log("Mails==>", data);
  // console.log("IsLoading===>", isLoading);
  // console.log("Errors==>==>", error);
  const handleDeleteMessage = async (id: number) => {
    try {
      setLoadingUserId(id);
      const res = await destroy(id);
      console.log("destroy mail res==>", res);
      if (res.data) {
        return toast.success(res.data?.message as string);
      }
    } catch (error) {}
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : data ? (
        <div className="grid gap-1">
          {data.inquiries.map((msg) => (
            <div key={msg.id} className="bg-gray-600 py-1 px-2 flex items-center justify-between rounded">
              <div className="flex gap-4 items-center">
                <Link to={`/mails/${msg.id}`} className="bg-gray-500 p-2 rounded-full text-center hover:bg-gray-400">
                  {msg.sender.name.slice(0, 1) + msg.sender.name.split(" ")[1].slice(0, 1)}
                </Link>
                <span>{msg.subject}</span>
              </div>

              <div className="flex items-center gap-4">
                {/* <span className="text-amber-500">{user.status}</span> */}
                {/* <Edit className="text-blue-400 cursor-pointer" /> */}
                {loadDestroy && loadingUserId === msg.id ? (
                  <Loader />
                ) : (
                  <Tooltip label="ban user">
                    <BadgeX onClick={() => handleDeleteMessage(msg.id)} className="text-red-400 cursor-pointer" />
                  </Tooltip>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="">No message found</div>
      )}
    </div>
  );
};
