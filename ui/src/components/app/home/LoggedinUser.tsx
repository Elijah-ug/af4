import { Avatar, Divider, Indicator, Loader, TextInput } from "@mantine/core";
import { X } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useGetLoggedinUserQuery } from "../../../state/queries/user/userQuery";

export const LoggedinUser: React.FC<any> = ({ setSearch, search, loadUsers, handleClearSearch }) => {
  const { data, isLoading } = useGetLoggedinUserQuery();

  return (
    <div className="px-3 sm:px-5 lg:px-10 pb-5 ">
      {isLoading ? (
        <div className="">
          <Loader />
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
            <TextInput
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder="Search Users"
              className="w-full"
            />
            {loadUsers ? <Loader /> : search && <X onClick={handleClearSearch} className="absolute right-2" />}
          </div>
        </div>
      )}
      <Divider size="sm" />
    </div>
  );
};
