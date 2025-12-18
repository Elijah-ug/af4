import React from "react";
import { Badge, Divider, Image } from "@mantine/core";

type Options = {
  openModel: () => void;
  nuser: number;
};

export const Message: React.FC<Options> = ({ nuser, openModel }) => {
  const hasMsg = nuser === 0 || nuser === 1 || nuser === 2;
  //   if()
  return (
    <div>
      <div className="flex items-center gap-7 p-2" onClick={openModel}>
        <div className="">
          <Image
            radius="50%"
            h={50}
            w="50"
            fit="cover"
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-9.png"
          />
        </div>
        <div className="">
          <span>johndoe</span>
        </div>

        {hasMsg && (
          <Badge size="lg" circle>
            2
          </Badge>
        )}
      </div>
      <Divider size="xs" />
    </div>
  );
};
