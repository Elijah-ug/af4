import React from "react";
import { useGetInquiriesQuery } from "../../../state/queries/user/inquiries";

export const Mails: React.FC = () => {
  const { data, isLoading } = useGetInquiriesQuery();
  console.log("Mails==>", data);
  return (
    <div>
      <div className="">Welcome to mails page</div>
    </div>
  );
};
