import { Route, Routes } from "react-router-dom";
import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
// import { LandingPage } from "./components/app/LandingPage";
import { NavBar } from "./components/ui/NavBar";
import { Home } from "./components/app/Home";
import { Discover } from "./components/app/Discover";
import { Chat } from "./components/app/Chat";
import { Notifications } from "./components/app/Notifications";
import { Profile } from "./components/app/Profile";
import { Settings } from "./components/app/Settings";
import type React from "react";
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
import { ToastContainer } from "react-toastify";
import { MantineProvider } from "@mantine/core";
import { ActiveUsers } from "./components/app/loggedin/ActiveUsers";
import { LandingPage } from "./components/app/LandingPage";
import { SingleUser } from "./components/app/user/SingleUser";
import { AllMessages } from "./components/app/messages/AllMessages";
import { Friend } from "./components/app/messages/Friend";
import { useEffect } from "react";
import { useGetLoggedinUserQuery } from "./state/queries/user/userQuery";
import { connectSocket } from "./utils/handlesockets";
import { PasswordReset } from "./components/auth/PasswordReset";
import { UserLikes } from "./components/app/user/UserLikes";
import { ReportUser } from "./components/app/user/ReportUser";
export const App: React.FC = () => {
  const { data: user } = useGetLoggedinUserQuery();
  const fakeauth: boolean = false;
  // console.log("Current user connectSocket ==>", user);
  useEffect(() => {
    if (!user?.newUser.id) return;
    connectSocket(user?.newUser.id);
  }, [user?.newUser.id]);

  return (
    <MantineProvider defaultColorScheme="dark">
      {/* <ColorSchemeScript /> */}
      <div className={"flex flex-col min-h-screen"}>
        <div className="flex-1">
          <NavBar />
          <div className="px-5">
            {/* <Button onClick={toggleColorScheme}>Toggge {colorScheme === "dark" ? "light" : "dark"} schem</Button> */}
            <Routes>
              {fakeauth ? (
                <>
                  <Route path="/" element={<LandingPage />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="users/:user" element={<SingleUser />} />
                  {/* </Route> */}
                  <Route path="discover" element={<Discover />} />
                  <Route path="messages" element={<AllMessages />} />
                  <Route path="messages/:user" element={<AllMessages />} />
                  <Route path="chat" element={<Chat />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="/update" element={<SignUp />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="password-reset" element={<PasswordReset />} />
                  <Route path="my-likes" element={<ActiveUsers />} />
                  <Route path="likes" element={<UserLikes />} />
                  <Route path="report-user/:user" element={<ReportUser />} />
                  <Route path="/:user" element={<Friend />} />

                  {/* single components */}
                </>
              )}
            </Routes>
          </div>
          {/* <LandingPage /> */}
        </div>

        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          pauseOnHover
          draggable
          theme="colored"
        />
      </div>
    </MantineProvider>
  );
};
