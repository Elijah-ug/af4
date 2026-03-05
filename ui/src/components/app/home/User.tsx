import { Card, Image, Text, Indicator } from "@mantine/core";
import type React from "react";
import type { SafeUser } from "../../../types/types";
import { placeholder } from "../../../utils/global";
import { Link } from "react-router-dom";
import { useTriggerLikeMutation } from "../../../state/queries/user/userQuery";
import { Check, Heart } from "lucide-react";

type UserProps = {
  newUser: SafeUser;
};
export const User: React.FC<UserProps> = ({ newUser }) => {
  const [likeUser] = useTriggerLikeMutation();
  const handleLikeUser = async (to: number) => {
    try {
      console.log("waiting for like", to);

      const res = await likeUser(to);
      console.log("Like response==>", res);
    } catch (error) {
      console.log("Like error==>", error);
    }
  };

  return (
    <Card shadow="sm" padding="md" radius="md" withBorder>
      {" "}
      <div className="grid gap-1">
        <Link to={`/users/${newUser.id}`}>
          <Card.Section className="relative">
            <Indicator position="bottom-end" offset={6}>
              <Image src={placeholder} height={20} alt="Norway" />
            </Indicator>
            <div className="absolute bottom-7 left-1 rounded-full bg-violet-500">
              <Check />
            </div>
          </Card.Section>
        </Link>
        <div className="grid gap-1 pt-3">
          <div className="flex items-center justify-between">
            <Text size="sm" c="dimmed" className="flex items-center gap-2">
              <span>{newUser.username}</span>
              <span className="font-semibold">{newUser.gender}</span>
            </Text>
            <div className="flex items-center gap-1">
              <Heart size={19} color="red" className="cursor-pointer" onClick={() => handleLikeUser(newUser.id)} />
              <span className="text-xs">
                {newUser.likesTo && newUser.likesTo.length > 0 ? newUser.likesTo.length : ""}
              </span>
            </div>
          </div>
          <Text size="sm" c="dimmed" className="flex items-center gap-2">
            <span>Location:</span>
            <span>{newUser.location || "N/A"}</span>
          </Text>
          <Link to={`/chat/${newUser.id}`} className="bg-blue-500 p-1 text-center rounded text-sm">
            Send Message
          </Link>
        </div>
      </div>
    </Card>
  );
};
