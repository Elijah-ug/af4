import { Card, Image, Text, Badge, Button, Group } from "@mantine/core";
import type React from "react";

export const Profile: React.FC = () => {
  return (
    <div className="flex  justify-center gap-10 py-17">
      <Card shadow="sm" padding="lg" radius="md" withBorder className="w-lg">
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={160}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>Norway Fjord Adventures</Text>
        <Badge color="pink">On Sale</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes with tours and activities on and around
        the fjords of Norway
      </Text>

      <Button color="blue" fullWidth mt="md" radius="md">
        Book classic tour now
      </Button>
    </Card>
    <div className="">
      <div className="">
        <span>Name</span>
        <span>Elicom Elijah</span>
      </div>

      <div className="">
        <span>Name</span>
        <span>Elicom Elijah</span>
      </div>

      <div className="">
        <span>Name</span>
        <span>Elicom Elijah</span>
      </div>

      <div className="">
        <span>Name</span>
        <span>Elicom Elijah</span>
      </div>
    </div>
    </div>
  );
};
