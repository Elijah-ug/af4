// to link each notification to the corresponding

import React from "react";
import { useAllNewNotificationsQuery } from "../../state/queries/user/userQuery";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

export const Notifications: React.FC = () => {
  const { data: notifications } = useAllNewNotificationsQuery();

  console.log("notifications==>", notifications);
  dayjs.extend(relativeTime);

  return (
    <div className="">
      {notifications && (
        <div className="min-h-screen py-20 text-sm grid sm:place-items-center gap-5">
          {/* unread messages */}
          <div className="grid gap-1 sm:w-sm ">
            <h3 className="text-center text-lg font-semibold">New Likes</h3>
            {notifications &&
              notifications.likes.map((like: any) => (
                <Link
                  to="/my-likes"
                  key={like.id}
                  className={`${like.readAt !== null ? "bg-gray-500" : "bg-gray-600"} flex gap-3 text-center p-1 rounded-xs`}
                >
                  <div className="flex">
                    <span>{like.userB.name}</span>
                    <span>liked your profile</span>
                  </div>
                  <span>{dayjs(like.createdAt).fromNow()}</span>
                </Link>
              ))}
          </div>

          <div className="grid gap-1 sm:w-sm">
            <h3 className="text-center text-lg font-semibold">New Messages</h3>
            {notifications &&
              notifications.messages.map((message: any) => (
                <Link
                  to={`/chat/${message.sender.id}`}
                  key={message.id}
                  className={`${message.readAt !== null ? "bg-gray-500" : "bg-gray-600"} flex gap-3 items-center p-1 rounded-xs`}
                >
                  <div className="flex items-center gap-2">
                    <span>{message.sender.username}</span>
                    <span>messaged you</span>
                  </div>
                  <span>{dayjs(message.createdAt).fromNow()}</span>
                </Link>
              ))}
          </div>
          {/* <Link to="/likes" className="bg-gray-700 p-2">
               <span>You have {likes.unreadLikes} new likes </span>
             </Link> */}
        </div>
      )}
    </div>
  );
};
