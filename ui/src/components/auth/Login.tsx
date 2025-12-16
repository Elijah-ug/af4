import React from "react";
import { useForm } from "@mantine/form";
import { TextInput, Button } from "@mantine/core";
import { Link } from "react-router-dom";
export const Login: React.FC = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: { name: "", email: "", age: 0 },

    // functions will be used to validate values at corresponding key
    validate: {
      name: (value) => (value.length < 2 ? "Name must have at least 2 letters" : null),
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
            mt="sm"
            label="Email"
            placeholder="Email"
            key={form.key("email")}
            {...form.getInputProps("email")}
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
