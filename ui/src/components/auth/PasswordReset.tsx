import React, { useState, type FormEvent } from "react";
import { TextInput, Button, Card, Loader } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUpdatePasswordMutation } from "../../state/queries/user/userQuery";
import { Eye, EyeOff } from "lucide-react";
import { getErrorMessage } from "../../utils/global";
type Pwd = {
  email: string;
  password: string;
};
export const PasswordReset: React.FC = () => {
  const [updatePwd, { isLoading, error }] = useUpdatePasswordMutation();
  const [reveal, setReveal] = useState<Boolean>(false);
  const [userData, setUserData] = useState<Pwd>({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (localStorage.getItem("token")) {
        localStorage.removeItem("token");
      }
      const payload = await updatePwd(userData);
      if (!payload.data) {
        return null;
      }
      console.log("User found==>", payload);
      return navigate("/login", {
        state: { newEmail: payload.data.user.email, newPassword: userData.password },
      });
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
            <form onSubmit={handleLogin} className="">
              <div className="grid gap-5">
                <TextInput
                  mt="sm"
                  label="Email"
                  placeholder="Email"
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  value={userData.email}
                  required
                />

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

                <Button type="submit" mt="sm">
                  {isLoading ? <Loader color="blue" /> : "Reset Password"}
                </Button>
              </div>
              {/* <div className="mt-2 text-center">{err && <p className="text-red-400 text-sm">{`${err}!`}</p>}</div> */}
              <div className="flex flex-col gap-5 items-center mt-3 ">
                <p className="">Don't have an account?</p>
                <Link to="/signup" className="underline">
                  Create an account
                </Link>
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
