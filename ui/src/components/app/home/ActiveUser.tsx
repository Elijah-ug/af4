import { Card, Image, Text, Button, Indicator } from "@mantine/core";
import type React from "react";
import type { UserType } from "../../../types/types";
type UserProps = {
  newUser: UserType;
};
export const ActiveUser: React.FC<UserProps> = ({ newUser }) => {
  console.log("profilePic==>", newUser.profilePic);
  const placeholder = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDk_071dbbz-bewOvpfYa3IlyImYtpvQmluw&s";
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section component="a" href="https://mantine.dev/">
        <Indicator position="bottom-end" offset={6}>
          <Image src={placeholder} height={20} alt="Norway" />
        </Indicator>
      </Card.Section>
     

      <Text size="sm" c="dimmed">
        {newUser.username}
      </Text>
      <Text size="sm" c="dimmed" className="flex items-center gap-2">
        <span>Location:</span>
        <span>Nakawa</span>
      </Text>

      <Button color="green" fullWidth mt="md" radius="md">
        Send Message
      </Button>
    </Card>
  );
};
