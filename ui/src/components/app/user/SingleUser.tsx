import React from "react";
import { Card, Image, Indicator, Divider } from "@mantine/core";

import { useGetSingleUserQuery } from "../../../state/queries/user/userQuery";
import { Link, useParams } from "react-router-dom";
import { placeholder } from "../../../utils/global";
import { Heart } from "lucide-react";

export const SingleUser: React.FC = () => {
  const { user } = useParams<{ user: string | any }>();
  const { data } = useGetSingleUserQuery(Number(user), { skip: !user });
  console.log("User data==>", data);
  return (
    <div className="flex lg:flex-row flex-col   justify-center min-h-screen gap-10  px-3 lg:px-10 py-20 ">
      {data ? (
        <div className="grid gap-5">
          <Card shadow="sm" padding="lg" radius="md" withBorder className="sm">
            <div className="flex justify-center gap-9">
              <div className="w-[50%] sm:w-auto lg:w-[50%] grid gap-2">
                <Indicator position="bottom-end" offset={21}>
                  <Image src={placeholder} radius="50%" fit="cover" width={20} alt="Norway" />
                </Indicator>
                <div className="flex flex-col">
                  {/* {data.newUser.name} */}
                  <span className="font-semibold">{data.newUser.name}</span>
                </div>

                <div className="flex items-center gap-7">
                  <span className="text-sm">{data.newUser?.username}</span>
                  <Heart size={19} color="red" className=" " />
                </div>
              </div>
              {/*  */}
              <div className="lg:w-full text-sm">
                <div className="grid gap-5 text-sm">
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
                    <span>Age: </span>
                    <span>{new Date().getFullYear() - new Date(data.newUser.dateOfBirth).getFullYear()}</span>
                    <Divider size="" />
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Likes: </span>
                    <span>{data.newUser._count.likesTo}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid place-items-center pt-3">
              <Link to={`/chat/${data.newUser.id}`} className="bg-blue-500 p-2 sm:w-sm w-full text-center rounded text-sm">
              Send Message
            </Link>
            </div>
          </Card>

          <div className="grid gap-3">
            {/* bio */}
            <div className="border-gray-600 border-2 p-2">
              <h3 className="font-semibold">{data.newUser.username && `${data.newUser.username}'s`} bio</h3>
              <p className="text-sm font-light">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil impedit illo ducimus ab dicta nisi illum
                quas mollitia ullam vitae?
              </p>
            </div>

            <div className="border-gray-600 border-2 p-2 p-2">
              <h3 className="font-semibold">Interests</h3>
              <ul className="text-sm font-extralight">
                <li>Long term relationship</li>
                <li>One night stand</li>
                <li>Hookup with someone</li>
              </ul>
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
