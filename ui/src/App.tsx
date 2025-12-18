import { Route, Routes } from "react-router-dom";
import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
// import { LandingPage } from "./components/app/LandingPage";
import { Footer } from "./components/ui/Footer";
import { NavBar } from "./components/ui/NavBar";
import { Home } from "./components/app/Home";
import { Discover } from "./components/app/Discover";
import { Chat } from "./components/app/Chat";
import { Notifications } from "./components/app/Notifications";
import { Profile } from "./components/app/Profile";
import { Settings } from "./components/app/Settings";
import { Messages } from "./components/app/Messages";
import type React from "react";
import { Login } from "./components/auth/Login";
import { SignUp } from "./components/auth/SignUp";
import { ToastContainer } from "react-toastify";
import { Button, ColorSchemeScript, MantineProvider, useMantineColorScheme } from "@mantine/core";
import { ActiveUsers } from "./components/app/home/ActiveUsers";
import { useState } from "react";
import { LandingPage } from "./components/app/LandingPage";
export const App: React.FC = () => {
  const [fakeauth, setFakeAuth] = useState<boolean>(false);
  return (
    <MantineProvider defaultColorScheme="dark">
      {/* <ColorSchemeScript /> */}
      <div className="flex flex-col min-h-screen text-gray-600 ">
        <div className="flex-1">
          <NavBar />
          <div className="mt-21">
            {/* <Button onClick={toggleColorScheme}>Toggge {colorScheme === "dark" ? "light" : "dark"} schem</Button> */}
            <Routes>
              {fakeauth ? (
                <>
                  <Route path="/" element={<LandingPage />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="discover" element={<Discover />} />
                  <Route path="messages" element={<Messages />} />
                  <Route path="chat" element={<Chat />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="login" element={<Login />} />
                  <Route path="signup" element={<SignUp />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="settings" element={<Settings />} />
                  <Route path="active-users" element={<ActiveUsers />} />
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
