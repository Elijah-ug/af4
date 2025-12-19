import React from "react";
import { hasLength, isEmail, useForm } from "@mantine/form";
import { TextInput, Button, Card, Loader } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import type { LoginFormValues } from "../../types/types";
import { toast } from "react-toastify";
import { useLoginUserMutation } from "../../state/queries/user/userMutations";
export const Login: React.FC = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();
  const form = useForm<LoginFormValues>({
    mode: "uncontrolled",
    initialValues: { email: "", password: "" },
    // validate: zodResolver(loginSchema),
    validate: {
      email: isEmail("Invalid email"),
      password: hasLength({ min: 3 }, "Short pwd"),
    },
  });
  const handleLogin = async (values: LoginFormValues) => {
    try {
      const payload = await loginUser(values);

      if (payload.error && "data" in payload.error) {
        const msg = (payload.error.data as any)?.message || "Login failed";
        return toast.error(msg);
      }
      const token: string | undefined = (payload?.data as any)?.token || "No token";
      if (!token) {
        console.log("No token provided");
        return;
      }
      localStorage.setItem("token", token);
      navigate("/");
      console.log("payload==>", payload);
      return payload;
    } catch (error) {
      console.log("Validation errors=>", error);
      return toast.error("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center py-10 ">
      <Card shadow="sm" padding="lg" radius="md" withBorder className="w-lg bg-white shadow-xl p-7 rounded-lg">
        {isLoading ? (
          <div className="text-center">
            <Loader color="blue" />
          </div>
        ) : (
          <div className="">
            <form onSubmit={form.onSubmit(handleLogin)} className="">
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
              {/* <div className="mt-2 text-center">{err && <p className="text-red-400 text-sm">{`${err}!`}</p>}</div> */}
              <div className="flex flex-col gap-5 items-center mt-3 ">
                <p className="">Don't have an account?</p>
                <Link to="/signup" className="underline">
                  Sign Up
                </Link>
              </div>
            </form>
          </div>
        )}
      </Card>
    </div>
  );
};
