import { Card, Image, Indicator, Divider } from "@mantine/core";
import type React from "react";
import { useGetLoggedinUserQuery } from "../../state/queries/user/userQuery";
import { placeholder } from "../../utils/global";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

export const Profile: React.FC = () => {
  const { data } = useGetLoggedinUserQuery();
  console.log("Loggedin user==>", (data as any)?.safe);
  const profile = (data as any)?.safe;
  return (
    <div className="flex lg:flex-row flex-col   justify-center min-h-screen gap-10  px-3 lg:px-10 py-3">
      {data ? (
        <div className="grid gap-5">
          <Card shadow="sm" padding="lg" radius="md" withBorder className="sm">
            <div className="flex justify-center gap-9">
              <div className="w-[50%] sm:w-auto lg:w-[50%] grid gap-2">
                <Indicator position="bottom-end" offset={21}>
                  <Image src={placeholder} radius="50%" fit="cover" width={20} alt="Norway" />
                </Indicator>
                <div className="flex flex-col">
                  {/* {profile.name} */}
                  <span className="font-semibold">Mugisha Talent Elijah</span>
                  <span className="text-sm">{profile?.username}</span>
                </div>

                  <Link to="edit" className="flex items-center gap-7 w-[55%] bg-purple-400 p-1 rounded">
                    <Edit />
                    <span>Edit</span>
                  </Link>
              </div>
              {/*  */}
              <div className="lg:w-full text-sm">
                <div className="grid gap-5 text-sm">
                  <div className="flex items-center gap-2">
                    <span>Age:</span>
                    <span>{profile.age}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Gender:</span>
                    <span>{profile.gender}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Location</span>
                    <span>{"N/A"}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>Account:</span>
                    <span>{profile.status}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>D.O.B</span>
                    <span>{profile.dateOfBirth}</span>
                    <Divider size="" />
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="grid gap-3">
            {/* bio */}
            <div className="border p-2">
              <h3 className="font-semibold">{profile.username && `${profile.username}'s`} bio</h3>
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
