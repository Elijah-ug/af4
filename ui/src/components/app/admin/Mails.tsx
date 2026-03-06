import React from "react";
import { useGetInquiriesQuery } from "../../../state/queries/user/inquiries";

export const Mails: React.FC = () => {
  const { data, isLoading, error } = useGetInquiriesQuery();
  console.log("Mails==>", data);
  console.log("IsLoading===>", isLoading);
  console.log("Errors==>==>", error);

  return (
    <div>
      <div className="">Welcome to mails page</div>
    </div>
  );
};
