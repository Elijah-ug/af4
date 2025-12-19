import { Card, Image, Text, Button, Indicator } from "@mantine/core";
import type React from "react";
import type { UserType } from "../../../types/types";
import { placeholder } from "../../../utils/global";
import { Link } from "react-router-dom";
type UserProps = {
  newUser: UserType;
};
export const User: React.FC<UserProps> = ({ newUser }) => {

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <div className="grid gap-1">
        <Card.Section>
          <Link to={`/${newUser.id}`}>
            <Indicator position="top-start" label="new" offset={14}>
              <Image src={placeholder} alt="user" />
            </Indicator>
          </Link>
        </Card.Section>

        <div className="">
          <Text size="sm" c="dimmed">
            hyet
            {newUser.username || "@johndoe"}
          </Text>

          <Text size="sm" c="dimmed" className="flex items-center gap-2">
            <span>Location:</span>
            <span>Kisaasi</span>
          </Text>

          <Button color="green" fullWidth mt="md" radius="md">
            Send Message
          </Button>
        </div>
      </div>
    </Card>
  );
};
