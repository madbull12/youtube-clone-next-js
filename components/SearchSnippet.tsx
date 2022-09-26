import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import { IVideo, IVideoDetails } from "../interface";
import Avatar from "./Avatar";

interface IProps {
  video: IVideo;
}
const SearchSnippet = ({ video }: IProps) => {
  return (
    <Link href={`/watch?v=${video?.video?.videoId}`}>
      <div className="flex gap-x-3 cursor-pointer">
        {/* <img
                    loading="lazy"
                    src={video.snippet.thumbnails.medium.url}
                    height={video.snippet.thumbnails.medium.height}
                    width={video.snippet.thumbnails.medium.width}
                /> */}
        <Image
          className="w-1/2"
          src={video.video.thumbnails[0].url}
          height={ video.video.thumbnails[0].height}
          width={ video.video.thumbnails[0].width}
        />
        <div className="w-3/4">
          <h1 className="text-white text-xl  text-ellipsis">
            {video.video.title}
          </h1>
          <p className="text-gray-400">
            {video?.video.publishedTimeText}
          </p>
          <Link href="/">
          
            <div className="flex gap-x-2 items-center">
                <Avatar src={video.video.author.avatar[0].url} />
                <p className="text-gray-400 text-sm pt-2 hover:text-gray-300">
                  {video.video.author.title}
                </p>
            </div>
           
          </Link>

          <p className="text-gray-400 text-sm pt-3">
            {video?.video.descriptionSnippet}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchSnippet;
