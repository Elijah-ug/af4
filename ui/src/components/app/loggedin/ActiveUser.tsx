import { Card, Image, Text, Indicator } from "@mantine/core";
import type React from "react";
import type { SafeUser } from "../../../types/types";
import { placeholder } from "../../../utils/global";
import { Link } from "react-router-dom";
import { useUserLikesQuery } from "../../../state/queries/user/userQuery";
type UserProps = {
  newUser: SafeUser;
};
export const ActiveUser: React.FC<UserProps> = ({ newUser }) => {
  

  return (
    <div className="">
      <Card shadow="sm" padding="md" radius="md" withBorder>
        <div className="grid gap-1">
          <Card.Section>
            <Link to={`user/${newUser.id}`}>
              <Indicator position="top-start" label="new" offset={14}>
                <Image src={placeholder} alt="user" />
              </Indicator>
            </Link>
          </Card.Section>

          <div className="grid gap-1 relative">
            <Text size="sm" c="dimmed">
              {newUser.username || "@johndoe"}
            </Text>

            <Text size="sm" c="dimmed" className="flex items-center gap-2">
              <span>Location:</span>
              <span>Kisaasi</span>
            </Text>
            <Link to={`/${newUser.id}`} className="bg-blue-500 p-1 text-center rounded text-sm">
              Send Message
            </Link>
            {/* <div className="absolute right-1">
            <ThumbsUp size={19} onClick={() => handleLikeUser(newUser.id)} />
          </div> */}
          </div>
        </div>
      </Card>
    </div>
  );
};
