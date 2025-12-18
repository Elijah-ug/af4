import { Card, Image, Text, Badge, Button, Group, Indicator, Divider } from "@mantine/core";
import type React from "react";
import { useGetLoggedinUserQuery } from "../../state/queries/user/userQuery";
import { placeholder } from "../../utils/global";
import { Edit } from "lucide-react";
import { Link } from "react-router-dom";

export const Profile: React.FC = () => {
  const { data } = useGetLoggedinUserQuery();
  console.log("Loggedin user==>", (data as any)?.safe);
  const user = (data as any)?.safe;
  return (
    <div className="flex lg:flex-row flex-col   justify-center min-h-screen gap-10  px-3 lg:px-10">
      {data ? (
        <div className="grid gap-5">
          <Card shadow="sm" padding="lg" radius="md" withBorder className="sm">
            <div className="flex justify-between gap-7">
              <div className="w-full">
                <Indicator position="bottom-end" offset={21}>
                  <Image src={placeholder} radius="50%" fit="cover" width={20} alt="Norway" />
                </Indicator>
              </div>
              <div className="w-full">
                  <Text fw={700}>{user.name}</Text>
                  <Text fw={500}>{user.username}</Text>
              </div>
            </div>

            <Group justify="space-between" mt="md" mb="xs">
              <Text fw={500}>{user.name}</Text>
            </Group>

            <Text size="sm" c="dimmed">
              {user.bio}
            </Text>

            <Link to="edit" className="flex items-center gap-2 bg-purple-500 w-[50%] p-1.5 rounded">
              <Edit />
              <span> Edit Profile</span>
            </Link>
          </Card>
          <div className="grid gap-3 text-sm">
            <div className="flex items-center gap-3">
              <span>Age:</span>
              <span>{user.age}</span>
            </div>

            <div className="flex items-center gap-3">
              <span>Gender:</span>
              <span>{user.gender}</span>
            </div>

            <div className="flex items-center gap-3">
              <span>Location</span>
              <span>{user.location || "N/A"}</span>
            </div>

            <div className="flex items-center gap-3">
              <span>D.O.B</span>
              <span>{user.dateOfBirth}</span>
              <Divider size="" />
            </div>

            <div className="flex items-center gap-3">
              <span>Account Status:</span>
              <span>{user.status}</span>
            </div>
          </div>
          <div className="">
            <h3 className="">What you need to update</h3>
            <div className="text-sm text-red-400">location, interests, profile pic, bio</div>
          </div>
        </div>
      ) : (
        <div className="text-center font-semibold text-lg py-10">No data found</div>
      )}
    </div>
  );
};
