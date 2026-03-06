import React, { useState, type FormEvent } from "react";
import { TextInput, Button, Card, Loader } from "@mantine/core";
import { toast } from "react-toastify";
import { useInquireMutation } from "../../../state/queries/user/inquiries";
import { getErrorMessage } from "../../../utils/global";
type Inquiry = {
  email: string;
  name: string;
  subject: string;
  message: string;
};
export const Inquire: React.FC = () => {
  const [inquire, { isLoading, error }] = useInquireMutation();
  const [userData, setUserData] = useState<Inquiry>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSendInquiry = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = await inquire(userData);
      console.log("payload==>", payload);
      if (payload.data) {
        return toast.success(payload.data.message as string);
      }
      return payload;
    } catch (error) {
      console.log("Validation errors=>", error);
      return toast.error("Login failed");
    }
  };
  return (
    <div className="flex items-center justify-center py-24 ">
      <Card shadow="sm" padding="lg" radius="md" withBorder className="w-xs sm:w-lg  shadow-lg ">
        {isLoading ? (
          <div className="text-center">
            <Loader color="blue" />
          </div>
        ) : (
          <div className="">
            <form onSubmit={handleSendInquiry} className="">
              <div className="grid gap-5">
                <TextInput
                  label="name"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  required
                />

                <TextInput
                  mt="sm"
                  label="Email"
                  placeholder="Email"
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  value={userData.email}
                  required
                />

                <TextInput
                  mt="sm"
                  label="Subject"
                  placeholder="Subject"
                  onChange={(e) => setUserData({ ...userData, subject: e.target.value })}
                  value={userData.subject}
                  required
                />

                <TextInput
                  mt="sm"
                  label="Message"
                  placeholder="Message"
                  onChange={(e) => setUserData({ ...userData, message: e.target.value })}
                  value={userData.message}
                  required
                />

                <Button type="submit" mt="sm">
                  Send Message
                </Button>
              </div>
              {/* <div className="mt-2 text-center">{err && <p className="text-red-400 text-sm">{`${err}!`}</p>}</div> */}
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
