import { Button, NumberInput, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { Link } from "react-router-dom";
import { nameValidator, usernameValidator } from "../../utils/form";

export const Register: React.FC = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { name: "", username: "", email: "", age: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: nameValidator,
      username: usernameValidator,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      age: (value) => (value < 18 ? "You must be at least 18 to register" : null),
    },
  });

  return (
    <div className="flex items-center justify-center py-10">
      <form onSubmit={form.onSubmit(console.log)} className="w-lg">
        <div className="">
          <TextInput label="Name" placeholder="Name" key={form.key("name")} {...form.getInputProps("name")} />
          <TextInput
            label="UserName"
            placeholder="User Name"
            key={form.key("username")}
            {...form.getInputProps("username")}
          />
          <TextInput
            mt="sm"
            label="Email"
            placeholder="Email"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <NumberInput
            mt="sm"
            label="Age"
            placeholder="Age"
            min={0}
            max={99}
            key={form.key("age")}
            {...form.getInputProps("age")}
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
