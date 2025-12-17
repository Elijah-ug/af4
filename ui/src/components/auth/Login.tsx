import React from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { zodResolver } from "mantine-form-zod-resolver";
import { loginSchema } from "../../utils/form";
export const Login: React.FC = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },

    // functions will be used to validate values at corresponding key
    validate: zodResolver(loginSchema),
  });

  return (
    <div className="flex items-center justify-center py-10 ">
      <form onSubmit={form.onSubmit(console.log)} className="w-lg bg-white shadow-xl p-7 rounded-lg">
        <div className="">
          <TextInput
            mt="sm"
            label="Email"
            placeholder="Email"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Password"
            placeholder="password"
            key={form.key("password")}
            {...form.getInputProps("password")}
          />
          <Button type="submit" mt="sm">
            Submit
          </Button>
        </div>
        <div className="flex flex-col gap-5 items-center mt-3 ">
          <p className="">Don't have an account?</p>
          <Link to="/signup" className="underline">
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};
