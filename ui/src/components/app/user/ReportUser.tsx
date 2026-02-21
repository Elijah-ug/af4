import React, { useState, type FormEvent } from "react";
import { useReportUserMutation } from "../../../state/queries/user/userQuery";
import { useParams } from "react-router-dom";
import { TextInput, Button, Card, Loader } from "@mantine/core";
import { getErrorMessage } from "../../../utils/global";

export const ReportUser: React.FC = () => {
  const [reason, setReason] = useState("");
  const { user } = useParams();
  console.log("User selected==>", user);
  const [report, { isLoading, error }] = useReportUserMutation();
  console.log("Route connected");

  const handleReportUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await report({ userId: Number(user), reason });
      console.log("User==>", res);
      return (window.location.href = "/");
    } catch (error) {
      console.log("error is reporting==>", error);
    }
  };
  return (
    <div className="flex items-center justify-center py-24 ">
      <Card shadow="sm" padding="lg" radius="md" withBorder className="w-xs sm:w-lg  shadow-lg ">
        {user && (
          <div className="">
            <form onSubmit={handleReportUser} className="">
              <div className="grid gap-5">
                <TextInput
                  mt="sm"
                  label="reason"
                  placeholder="reason"
                  onChange={(e) => setReason(e.target.value)}
                  value={reason}
                  required
                />

                <Button type="submit" mt="sm">
                  {isLoading ? <Loader /> : "Submit"}
                </Button>
              </div>
            </form>
          </div>
        )}
        {error && (
          <div className="text-sm flex items-center gap-3 py-3">
            <span className="text-sm text-red-400">{getErrorMessage(error)}</span>
          </div>
        )}
      </Card>
    </div>
  );
};
