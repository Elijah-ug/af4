import { Button, Card, Group, Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { useState } from "react";
import { dates, months, signupSchema, years } from "../../utils/form";
import { zodResolver } from "mantine-form-zod-resolver";
import type { SignupFormValues, SignupPayload } from "../../types/types";
import { useRegisterUserMutation } from "../../state/queries/user/userMutations";
import { toast } from "react-toastify";

export const SignUp: React.FC = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const [err, setErr] = useState<string | null>(null);

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
      if (res.error && "data" in res.error) {
        const msg = (res.error.data as any)?.message || "Signup failed";
        setErr(msg);
      } else {
        toast.success("Signup successful!");
      }
      console.log("Res==>", res);

      return res;
    } catch (error) {
      console.log("Dev errors==>", error);
      return toast.error("Signup failed!");
    }
  };

  return (
    <div className="flex flex-col gap-7 items-center justify-center py-5">
      <h3>Create An Account</h3>
      <Card shadow="sm" padding="lg" radius="md" withBorder className="w-lg">
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

                <TextInput label="password" key={form.key("password")} {...form.getInputProps("password")} required />

                <Button type="submit" mt="sm">
                  Sign up
                </Button>
              </div>
              <div className="mt-2 text-center">{err && <p className="text-red-400 text-sm">{`${err}!`}</p>}</div>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
};
