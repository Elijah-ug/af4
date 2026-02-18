import { Button, Card, Group, Loader, Select, Text, TextInput } from "@mantine/core";
import React, { useEffect, useState, type FormEvent } from "react";
import { dates, months, years } from "../../utils/form";
import type { SignupFormValues, SignupPayload } from "../../types/types";
import {
  useGetLoggedinUserQuery,
  useRegisterUserMutation,
  useUpdateProfieMutation,
} from "../../state/queries/user/userQuery";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

export const SignUp: React.FC = () => {
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const [updateUser, { isLoading: loadUpdate }] = useUpdateProfieMutation();
  const { data } = useGetLoggedinUserQuery();
  console.log("Current user==>", data);
  const [reveal, setReveal] = useState<Boolean>(false);
  const [userData, setUserData] = useState<SignupFormValues>({
    name: "",
    username: "",
    email: "",
    gender: "",
    password: "",
    date: "",
    month: "",
    year: "",
  });

  useEffect(() => {
    if (data?.newUser) {
      setUserData({
        name: (data?.newUser?.name as string) ?? "",
        username: (data?.newUser?.username as string) ?? "",
        email: (data?.newUser?.email as string) ?? "",
        gender: (data?.newUser?.gender as string) ?? "",
        password: "",
        date: "",
        month: "",
        year: "",
      });
    }
  }, [data]);

  const handleFormSubmission = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Update or Save");
    try {
      console.log("Waiting for updating profile");
      const dateOfBirth = new Date(`${userData.year}-${userData.month}-${userData.date}`).toISOString().split("T")[0];
      const { year, month, date, ...payload } = userData;
      const newvals: SignupPayload = { ...payload, dateOfBirth };
      if (data?.newUser) {
        const res = await updateUser(newvals);
        console.log("Updated response==>", res);
        return (window.location.href = "/");
      }
      const res = await registerUser(newvals);
      const token: string | undefined = (res?.data as any | string)?.token || "No token";
      if (!token) {
        return console.log("No token");
      }
      console.log("payload==>", payload);
      localStorage.setItem("token", token);
      console.log("Res from signup==>", res);

      return (window.location.href = "/");
    } catch (error) {
      console.log("Dev errors==>", error);
      return toast.error("Signup failed!");
    }
  };

  return (
    <div className="flex flex-col gap-7 items-center justify-center py-18">
      <h3>Create An Account</h3>
      <Card shadow="sm" padding="lg" radius="md" withBorder className="w-xs sm:w-lg">
        {isLoading ? (
          <div className="">Loading...</div>
        ) : (
          <div className="">
            <form onSubmit={handleFormSubmission}>
              <div className="grid gap-3">
                <TextInput
                  label="Name"
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                  value={userData.name}
                  placeholder="Name"
                  required={!data}
                />
                <TextInput
                  label="UserName"
                  placeholder="User Name"
                  onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                  value={userData.username}
                  required={!data}
                />

                <TextInput
                  mt="sm"
                  label="Email"
                  placeholder="Email"
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  value={userData.email}
                  required={!data}
                />

                <Select
                  label="Gender"
                  placeholder="select gender"
                  value={userData.gender}
                  onChange={(value) => setUserData({ ...userData, gender: value as string })}
                  data={["M", "F"]}
                  required={!data}
                />

                <div className="">
                  <Text>Date Of Birth</Text>
                  <Group grow>
                    <Select
                      data={years() ?? []}
                      value={userData.year}
                      onChange={(value) => setUserData({ ...userData, year: value as string })}
                      placeholder="YYYY"
                    />
                    <Select
                      data={months() ?? []}
                      value={userData.month}
                      onChange={(value) => setUserData({ ...userData, month: value as string })}
                      placeholder="MMM"
                    />
                    <Select
                      data={dates() ?? []}
                      value={userData.date}
                      onChange={(value) => setUserData({ ...userData, date: value as string })}
                      placeholder="DD"
                    />
                  </Group>
                </div>

                {!data && (
                  <div className="relative">
                    <TextInput
                      label="password"
                      type={reveal ? "text" : "password"}
                      value={userData.password}
                      onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                      required
                    />
                    <div className="absolute right-2 top-7.5" onClick={() => setReveal((prev) => !prev)}>
                      {reveal ? <EyeOff className="cursor-pointer" /> : <Eye className="cursor-pointer" />}
                    </div>
                  </div>
                )}

                <Button type="submit" mt="sm">
                  {isLoading || loadUpdate ? <Loader /> : data ? "Save" : "Sign Up"}
                </Button>
              </div>
              <div className="mt-2 text-center">{error && <p className="text-red-400 text-sm">{`${error}!`}</p>}</div>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
};
