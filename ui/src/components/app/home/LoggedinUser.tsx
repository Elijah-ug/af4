import { Avatar, Divider, Indicator, Loader, TextInput } from "@mantine/core";
import { Search } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useGetLoggedinUserQuery } from "../../../state/queries/user/userQuery";

export const LoggedinUser: React.FC = () => {
  const { data, isLoading } = useGetLoggedinUserQuery();
  // console.log("Loggedin User==>", data);
  return (
    <div className="px-3 sm:px-5 lg:px-10 pb-5 ">
      {isLoading ? (
        <div className="">
          <Loader />{" "}
        </div>
      ) : (
        <div className=" flex items-center lg:justify-between gap-10 pb-5 ">
          <div className="">
            {data ? (
              <Link to="profile" className="flex items-center text-sm">
                <Indicator position="bottom-end" offset={6}>
                  <Avatar src="image.png" className="cursor-pointer" />
                </Indicator>
              </Link>
            ) : (
              <Link to="login" className="">
                <Avatar src="image.png" className="cursor-pointer" />
              </Link>
            )}
          </div>
          <div className="flex items-center relative w-full">
            <TextInput placeholder="Search Users" className="w-full" />
            <Search className="absolute right-2" />
          </div>
        </div>
      )}
      <Divider size="sm" />
    </div>
  );
};
