import React from "react";
import { Card, Text, Badge, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import { Mail } from "lucide-react";

export const AllMails: React.FC = () => {
  return (
    <div>
      <Card shadow="sm" padding="lg" className="w-xs h-full bg-white" radius="md" withBorder>
        <Link to="all-mails">
          <Card.Section className="grid place-items-center py-2">
            <Mail />
          </Card.Section>

          <Group justify="space-between" mt="md" mb="xs">
            <Text fw={500}>23 Platform Inquiries</Text>
            <Badge color="pink">+14%</Badge>
          </Group>

          <Text size="sm" c="dimmed">
            From Dec, 2025 to today
          </Text>
        </Link>
      </Card>
    </div>
  );
};
