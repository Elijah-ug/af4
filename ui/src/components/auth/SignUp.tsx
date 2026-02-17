import { Button, Card, Group, Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { dates, months, signupSchema, years } from "../../utils/form";
import { zodResolver } from "mantine-form-zod-resolver";
import type { SignupFormValues, SignupPayload } from "../../types/types";
import { useRegisterUserMutation } from "../../state/queries/user/userQuery";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const SignUp: React.FC = () => {
  const [registerUser, { isLoading, error }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const form = useForm<SignupFormValues>({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      username: "",
      email: "",
      gender: "",
      password: "",
      year: "",
      month: "",
      date: "",
    },

    // functions will be used to validate values at corresponding key
    validate: zodResolver(signupSchema),
  });

  const handleFormSubmission = async (values: SignupFormValues) => {
    try {
      const dateOfBirth = new Date(`${values.year}-${values.month}-${values.date}`).toISOString().split("T")[0];
      const { year, month, date, ...payload } = values;
      const newvals: SignupPayload = { ...payload, dateOfBirth };
      const res = await registerUser(newvals);
      const token: string | undefined = (res?.data as any | string)?.token || "No token";
      if (!token) {
        return console.log("No token");
      }
      console.log("payload==>", payload);
      localStorage.setItem("token", token);
      console.log("Res==>", res);
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
            <form onSubmit={form.onSubmit(handleFormSubmission)}>
              <div className="grid gap-3">
                <TextInput
                  label="Name"
                  placeholder="Name"
                  key={form.key("name")}
                  {...form.getInputProps("name")}
                  required
                />
                <TextInput
                  label="UserName"
                  placeholder="User Name"
                  key={form.key("username")}
                  {...form.getInputProps("username")}
                  required
                />
                <Select
                  label="Gender"
                  placeholder="select gender"
                  key={form.key("gender")}
                  {...form.getInputProps("gender")}
                  data={["M", "F"]}
                  required
                />

                <TextInput
                  mt="sm"
                  label="Email"
                  placeholder="Email"
                  key={form.key("email")}
                  {...form.getInputProps("email")}
                  required
                />

                <div className="">
                  <Text>Date Of Birth</Text>
                  <Group grow>
                    <Select data={years()} key={form.key("year")} {...form.getInputProps("year")} placeholder="YYYY" />
                    <Select
                      data={months()}
                      key={form.key("month")}
                      {...form.getInputProps("month")}
                      placeholder="MMM"
                    />
                    <Select data={dates()} key={form.key("date")} {...form.getInputProps("date")} placeholder="DD" />
                  </Group>
                </div>

                <TextInput
                  label="password"
                  type="password"
                  key={form.key("password")}
                  {...form.getInputProps("password")}
                  required
                />

                <Button type="submit" mt="sm">
                  Sign up
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
