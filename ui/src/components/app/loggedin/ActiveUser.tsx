import { Card, Image, Text, Indicator } from "@mantine/core";
import type React from "react";
import type { SafeUser } from "../../../types/types";
import { placeholder } from "../../../utils/global";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { useTriggerLikeMutation } from "../../../state/queries/user/userQuery";
type UserProps = {
  newUser: SafeUser;
};
export const ActiveUser: React.FC<UserProps> = ({ newUser }) => {
  const [likeUser] = useTriggerLikeMutation();
  const handleLikeUser = async (to: number) => {
    try {
      const res = await likeUser(to);
      console.log("Like response==>", res);
      return res;
    } catch (error) {
      console.log("Like error==>", error);
    }
  };
  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      <div className="grid gap-1">
        <Card.Section>
          <Indicator position="bottom-end" offset={6}>
            <Image src={placeholder} height={20} alt="Norway" />
          </Indicator>
        </Card.Section>

        <div className="grid gap-1 relative">
          <Text size="sm" c="dimmed">
            {newUser.username}
          </Text>
          <Text size="sm" c="dimmed" className="flex items-center gap-2">
            <span>Location:</span>
            <span>Nakawa</span>
          </Text>
          <Link to={`/${newUser.id}`} className="bg-blue-500 p-1 text-center rounded text-sm">
            Send Message
          </Link>
          <div className="absolute right-1 flex items-center gap-1">
            <Heart size={19} color="red" onClick={() => handleLikeUser(newUser.id)} />
            <span className="text-xs">
              {newUser.likesTo && newUser.likesTo.length > 0 ? newUser.likesTo.length : ""}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
