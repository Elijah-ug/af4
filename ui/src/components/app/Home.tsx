import React, { useEffect, useState } from "react";
import { LoggedinUser } from "./home/LoggedinUser";
import { AllUsers } from "./home/AllUsers";
import { Outlet } from "react-router-dom";
import { useSearchUsersQuery } from "../../state/queries/user/userQuery";

export const Home: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>();
  // debounce during search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);
    return () => clearTimeout(timer);
  }, [search]);
  const { data: searched, isLoading: loadUsers } = useSearchUsersQuery(debouncedSearch, { skip: !debouncedSearch });
  console.log("fetched debouncedSearch==>", debouncedSearch);
  console.log("fetched searched==>", searched);

  const handleClearSearch = () => {
    if (search) {
      setSearch("");
      setDebouncedSearch("");
      return (window.location.href = "/");
    }
  };
  return (
    <div className="min-h-screen px-3 lg:px-10 py-18">
      <div className="">
        <LoggedinUser
          setSearch={setSearch}
          search={search}
          loadUsers={loadUsers}
          handleClearSearch={handleClearSearch}
        />
      </div>
      <div className="">
        <AllUsers searched={searched} loadUsers={loadUsers} />
      </div>
      <Outlet />
    </div>
  );
};
