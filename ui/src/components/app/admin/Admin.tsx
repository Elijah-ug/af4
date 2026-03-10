import React from "react";
import { Card, Text, Badge, Group, Indicator, Avatar, Button } from "@mantine/core";
import { useGetLoggedinUserQuery } from "../../../state/queries/user/userQuery";

export const Admin: React.FC = () => {
  const { data } = useGetLoggedinUserQuery();
//   console.log("Admin data==>", data);
  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      localStorage.removeItem("token");
      console.log("Loggedout==>");
      return (window.location.href = "/login");
    }
  };
  return (
    <div>
      <Card shadow="sm" padding="lg" className="w-xs h-full bg-white" radius="md" withBorder>
        <Card.Section className="grid place-items-center py-2">
          <Indicator position="bottom-start" offset={6}>
            <Avatar src="image.png" className="cursor-pointer" />
          </Indicator>
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={700}>{data?.newUser.username}</Text>
          <Badge color="pink">{data?.newUser.role}</Badge>
        </Group>

        <Button color="red"  onClick={handleLogout}>Logout</Button>
      </Card>
    </div>
  );
};
