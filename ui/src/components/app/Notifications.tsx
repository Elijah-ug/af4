import React from "react";
import { useUnreadMessagesQuery } from "../../state/queries/user/messages/messageQueries";
import { useUnreadLikesQuery } from "../../state/queries/user/userQuery";
import { Link } from "react-router-dom";

export const Notifications: React.FC = () => {
  const { data: msg, isLoading, error } = useUnreadMessagesQuery();
  const { data: likes } = useUnreadLikesQuery();
  console.log("useUnreadLikesQuery==>", likes);
  return (
    <div className="min-h-screen py-20">
      <div className="grid gap-1 text-sm">
        {/* unread messages */}
        {msg && msg.unreadMsg > 0 && (
          <Link to="/messages" className="bg-gray-700 p-2">
            <span>You have {msg.unreadMsg} unread messages </span>
          </Link>
        )}

        {/* unread messages */}
        {likes && likes.unreadLikes > 0 && (
          <Link to="/likes" className="bg-gray-700 p-2">
            <span>You have {likes.unreadLikes} new likes </span>
          </Link>
        )}
      </div>
    </div>
  );
};
