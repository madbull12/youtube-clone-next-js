import { GetServerSideProps } from "next";
import Image from "next/image";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import toHTML from "../helper/toHTML";
import { IComment } from "../interface";
import { CommentWithPayload } from "../types";
import Avatar from "./Avatar";

interface IProps {
  comment: CommentWithPayload;
}
const Comment = ({ comment }: IProps) => {
  return (
    <div className="gap-x-4 items-center flex">
      <Avatar width={30} height={30} src={comment?.author?.image ?? ""} />
      <div className="space-y-2">
        <div className="flex gap-x-2 items-center ">
          <p className="text-white font-semibold">{comment?.author?.name}</p>
          <ReactTimeAgo
            className="text-gray-400 text-sm"
            date={comment?.createdAt}
          />
        </div>
        <p className="text-white">{comment?.text}</p>
      </div>
    </div>
  );
};

export default Comment;
