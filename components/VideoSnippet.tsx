import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import { ISnippet, IVideo, IVideoDetails, IVideoInfo } from "../interface";

interface IProps {
  video: IVideo;
}
const VideoSnippet = ({ video }: IProps) => {
  return (
    <Link href={`/watch?v=${video.video.videoId}`}>
      <div className="flex gap-x-2 cursor-pointer">
        <Image
          src={video?.video.thumbnails[0].url}
          height={video?.video.thumbnails[0].height}
          objectFit="cover"
          width={video?.video.thumbnails[0].width}
          className="w-1/2"
        />
        <div className="w-1/2">
          <h1 className="text-md text-white">{video.video.title}</h1>
          <Link href="/">
            <p className="text-gray-400 text-sm">
              {video.video.author.title}
            </p>
          </Link>
          <p className="text-gray-400 text-sm">
            {video.video.publishedTimeText}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default VideoSnippet;
