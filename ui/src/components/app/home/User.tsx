import { Card, Image, Text, Badge, Button, Group, Indicator } from "@mantine/core";
import type React from "react";
import type { UserType } from "../../../types/types";
import { placeholder } from "../../../utils/global";
import { Link, useParams } from "react-router-dom";
type UserProps = {
  newUser: UserType;
};
export const User: React.FC<UserProps> = ({ newUser }) => {
  // const route =useParams()
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
        <Link to={`/${newUser.id}`}>
          <Card.Section>
            <Indicator position="top-start" label="new" offset={14}>
              <Image src={placeholder} height={20} alt="user" />
            </Indicator>
          </Card.Section>
        </Link>

      <Text size="sm" c="dimmed">
        {newUser.username || "@johndoe"}
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
