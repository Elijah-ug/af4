import { Card, Image, Text, Indicator } from "@mantine/core";
import type React from "react";
import type { SafeUser } from "../../../types/types";
import { placeholder } from "../../../utils/global";
import { Link } from "react-router-dom";
import { ThumbsUp } from "lucide-react";
import { useTriggerLikeMutation } from "../../../state/queries/user/messages/actionsQueries";
type UserProps = {
  newUser: SafeUser;
};
export const User: React.FC<UserProps> = ({ newUser }) => {
  const [likeUser] = useTriggerLikeMutation();
  const handleLikeUser = async (to: number) => {
    try {
      const res = await likeUser(to);
      console.log("Like response==>", res);
    } catch (error) {
      console.log("Like error==>", error);
    }
  };
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

        <div className="grid gap-1">
          <Text size="sm" c="dimmed">
            hyet
            {newUser.username || "@johndoe"}
          </Text>

          <Text size="sm" c="dimmed" className="flex items-center gap-2">
            <span>Location:</span>
            <span>Kisaasi</span>
          </Text>
          <Link to={`/friend/${newUser.id}`} className="bg-blue-500 p-1 text-center rounded text-sm">
            Send Message
          </Link>
          <div className="">
            <ThumbsUp size={15} onClick={() => handleLikeUser(newUser.id)} />
          </div>
        </div>
      </div>
    </Card>
  );
};
