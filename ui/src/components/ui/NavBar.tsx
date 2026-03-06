// NavBar.tsx
import React from "react";
import { Home, MessageCircle, Compass, Bell, Settings, Moon, Sun, Users, LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Badge, useMantineColorScheme } from "@mantine/core";
import { useGetAllMessagesQuery, useUpdateMyChatsMutation } from "../../state/queries/user/messages/messageQueries";
import { useAllNewNotificationsQuery, useGetLoggedinUserQuery } from "../../state/queries/user/userQuery";

export const NavBar: React.FC = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { data: user } = useGetLoggedinUserQuery();
  const navlinks = [
    { link: "/", i: Home },
    { link: "my-likes", i: Users },
    { link: "messages", i: MessageCircle },
    { link: "discover", i: Compass },
    { link: "notifications", i: Bell },
    { link: "settings", i: Settings },
    { link: "dashboard", i: LayoutDashboard },
  ];

  const { data: msg } = useGetAllMessagesQuery();
  const [updateMany, { isLoading }] = useUpdateMyChatsMutation();
  const { data: notifications, isLoading: LoadNotifications } = useAllNewNotificationsQuery();
  // console.log("useGetChatsQuery msg==>", chats);

  const handleUnsetNotification = async () => {
    try {
      const res = await updateMany();
      console.log("Updated many chats==>", res);
    } catch (error) {
      console.log("error==>", error);
      return;
    }
  };

  return (
    <nav
      className={
        colorScheme === "dark"
          ? "fixed sm:bottom-0 left-0 right-0  shadow-md bg-gray-800 text-white border-gray-200 z-50 font-semibold px-3 lg:px-10 py-3"
          : "fixed sm:bottom-0 left-0 right-0  shadow-md  border-gray-200 z-50 font-semibold px-3 lg:px-10 py-3 bg-gray-200 "
      }
    >
      <div className="flex items-center justify-between gap-5 ">
        <div className="flex justify-between items-center w-full lg:gap-7 pr-3  py-2">
          {/* Home */}

          {navlinks.map((nav, i) => (
            <NavLink key={i} to={nav.link} className=" hover:text-pink-600 transition">
              {nav.i === MessageCircle ? (
                <div className={`${msg && msg.globalCount > 0 && "relative"}  flex`}>
                  <nav.i size={19} strokeWidth={2.5} onClick={handleUnsetNotification} />

                  {!isLoading && msg && msg.globalCount > 0 && (
                    <Badge size="xs" color="red" circle className="absolute -top-1 -right-1 z-50">
                      {msg.globalCount}
                    </Badge>
                  )}
                </div>
              ) : nav.i === Bell ? (
                <div className={`${notifications && notifications.all > 0 && "relative"}  flex`}>
                  <nav.i size={19} strokeWidth={2.5} onClick={handleUnsetNotification} />

                  {!LoadNotifications && notifications && notifications.all > 0 && (
                    <Badge size="xs" color="red" circle className="absolute -top-1 -right-1 z-50">
                      {notifications.all}
                    </Badge>
                  )}
                </div>
              ) : nav.i === LayoutDashboard && user?.newUser.role !== "admin" ? (
                <nav.i className="hidden" size={19} strokeWidth={2.5} />
              ) : (
                <nav.i size={19} strokeWidth={2.5} />
              )}
            </NavLink>
          ))}
        </div>
        <div className="lg:w-full lg:flex lg:items-center lg:justify-end cursor-pointer" onClick={toggleColorScheme}>
          {colorScheme === "light" ? (
            <Sun size={17} className="text-amber-500" />
          ) : (
            <Moon size={17} className="text-gray-300" />
          )}
        </div>
      </div>
    </nav>
  );
};
