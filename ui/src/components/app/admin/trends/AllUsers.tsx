import React from "react";
import { Card, Text, Badge, Group } from "@mantine/core";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

export const AllUsers: React.FC = () => {
  const data = {
    labels: ["Dec", "Jan", "Feb", "Mar"],
    datasets: [
      {
        data: [5, 10, 15, 20],
        borderColor: "#3b82f6",
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <Card shadow="sm" padding="lg" className="w-xs h-full bg-white" radius="md">
      <Link to="platform-users">
        <Card.Section className="grid place-items-center py-2">
          <Users />
        </Card.Section>

        <Group justify="space-between" mt="md" mb="xs">
          <Text fw={500}>20 Platform Users</Text>
          <Badge color="pink">+12%</Badge>
        </Group>

        <Text size="sm" c="dimmed">
          From Dec, 2025 to today
        </Text>

        <div style={{ height: 60 }}>
          <Line datasetIdKey="data" data={data} options={options} />
        </div>
      </Link>
    </Card>
  );
};
