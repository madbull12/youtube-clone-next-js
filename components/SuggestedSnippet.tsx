import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import { ISnippet, IVideo, IVideoDetails } from "../interface";

interface IProps {
  video: IVideoDetails;
}
const SuggestedSnippet = ({ video }: IProps) => {
  return (
    <Link href={`/watch?v=${video.id.videoId}`}>
      <div className="flex gap-x-2 cursor-pointer">
        <Image
          src={video.snippet.thumbnails.medium.url}
          height={120}
          objectFit="cover"
          width={160}
          className="w-1/2"
        />
        <div className="w-1/2">
          <h1 className="text-md text-white">{video.snippet.title}</h1>
          <Link href="/">
            <p className="text-gray-400 text-sm">
              {video.snippet.channelTitle}
            </p>
          </Link>
          <p className="text-gray-400 text-sm">
            <ReactTimeAgo date={video.snippet.publishedAt} />
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SuggestedSnippet;
