import { Card, Image, Text, Button, Indicator } from "@mantine/core";
import type React from "react";
import type { UserType } from "../../../types/types";
import { placeholder } from "../../../utils/global";
import { Link } from "react-router-dom";
type UserProps = {
  newUser: UserType;
};
export const ActiveUser: React.FC<UserProps> = ({ newUser }) => {
  console.log("profilePic==>", newUser.profilePic);

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <Card.Section>
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
      <Link to="/messages" className="bg-blue-500 p-1 text-center rounded text-sm">
        Send Message
      </Link>
    </Card>
  );
};
