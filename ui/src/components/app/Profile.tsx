import { Card, Image, Indicator, Divider, Loader, Button } from "@mantine/core";
import type React from "react";
import { useDestroyAccountMutation, useGetLoggedinUserQuery } from "../../state/queries/user/userQuery";
import { placeholder } from "../../utils/global";
import { Link, useNavigate } from "react-router-dom";
import { Pencil } from "lucide-react";
import { disconnectSocket } from "../../utils/handlesockets";

export const Profile: React.FC = () => {
  const { data, isLoading } = useGetLoggedinUserQuery();
  const [delMe, { isLoading: loadDel }] = useDestroyAccountMutation();
  const navigate = useNavigate();
  // console.log("Loggedin user==>", data);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    // disconnect the socket connection
    disconnectSocket();
    return (window.location.href = "/");
  };
  // delete account
  const handleDeleteAcc = async (userId: number) => {
    try {
      await delMe(userId);
      return (window.location.href = "/");
    } catch (error) {
      console.log("Delete error", error);
    }
  };
  return (
    <div className="flex lg:flex-row flex-col   justify-center min-h-screen gap-10  px-3 lg:px-10 py-18">
      {isLoading ? (
        <Loader />
      ) : data ? (
        <div className="grid gap-5">
          <Card shadow="sm" padding="lg" radius="md" withBorder className="sm">
            <div className="flex justify-center gap-9">
              <div className="w-[50%] sm:w-auto lg:w-[50%] grid gap-2">
                <Indicator position="bottom-end" offset={21}>
                  <Image src={placeholder} radius="50%" fit="cover" width={20} alt="Norway" />
                </Indicator>
                <div className="flex flex-col">
                  {/* {data.name} */}
                  {/* <span className="font-semibold">Mugisha Talent Elijah</span> */}
                  <span className="text-sm">{data?.newUser.username}</span>
                </div>

                <div className="">
                  <Link to="edit" className="flex items-center justify-around gap- bg-purple-400 p-1 rounded">
                    <Pencil className="text-white" />
                    <span>Edit</span>
                  </Link>
                </div>
              </div>
              {/*  */}
              <div className="lg:w-full text-sm">
                <div className="grid gap-5 text-sm">
                  <div className="flex items-center gap-2">
                    <span>Age:</span>
                    <span>{data.newUser.age}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Gender:</span>
                    <span>{data.newUser.gender}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Location</span>
                    <span>{"N/A"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Account:</span>
                    <span>{data.newUser.status}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>D.O.B</span>
                    <span>{data.newUser.dateOfBirth}</span>
                    <Divider size="" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-3">
            {/* bio */}
            <div className="border p-2">
              <h3 className="font-semibold">{data.newUser.username && `${data.newUser.username}'s`} bio</h3>
              <p className="text-sm font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil impedit illo ducimus ab dicta nisi illum
                quas mollitia ullam vitae?
              </p>
            </div>

            <div className="border p-2">
              <h3 className="font-semibold">Interests</h3>
              <ul className="text-sm font-extralight">
                <li>Long term relationship</li>
                <li>One night stand</li>
                <li>Hookup with someone</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button onClick={() => handleDeleteAcc(data.newUser.id)} color="red">
                {loadDel ? <Loader /> : <span>Delete Account </span>}
              </Button>
              <Button onClick={handleLogOut} className="">
                Log out
              </Button>
            </div>

            <h3 className="font-semibold">What you need to update</h3>
            <div className="text-sm text-red-400">location, interests, profile pic, bio</div>
          </div>
        </div>
      ) : (
        <div className="text-center font-semibold text-lg py-10">No data found</div>
      )}
    </div>
  );
};
