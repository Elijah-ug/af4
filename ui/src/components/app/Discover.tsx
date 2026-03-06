import React from "react";
import { Link } from "react-router-dom";

export const Discover: React.FC = () => {
  return (
    <div className="min-h-screen py-20">
      {" "}
      <div className="flex flex-col">
        <h3 className="font-semibold text-lg">About The Tick with the following characteristics</h3>
        <div className="flex flex-col">
          <p>A violet background: Account is activated </p>
          <p>A violet background: Account is activated </p>
          <p>A violet background: Account is activated </p>
          <p>A violet background: Account is activated </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <h3>Any Inquiries?</h3>
        <Link to="/send-inquiry" className="text-green-400">
          Send us a message
        </Link>
      </div>
    </div>
  );
};
