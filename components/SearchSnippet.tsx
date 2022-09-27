import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import nFormatter from "../helper/convertion";
import toHHMS from "../helper/toHHMS";
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
                <div className="relative">
                  <Image
                      className="w-1/2"
                      src={video.video.thumbnails[0].url}
                      height={ video.video.thumbnails[0].height}
                      width={ video.video.thumbnails[0].width}
                    />
                    <div className="bg-black opacity-75 text-white text-xs p-1 right-2 rounded-lg absolute bottom-2">
                      {toHHMS(video.video.lengthSeconds.toString())}
                    </div>
                </div>
    
        <div className="w-3/4">
          <h1 className="text-white text-xl  text-ellipsis">
            {video.video.title}
          </h1>
          <div className="flex gap-x-3 items-center text-sm">
          <p className="text-gray-400">
              {nFormatter(video?.video.stats.views)} views
            </p>
            <p className="text-gray-400">
              {video?.video.publishedTimeText}
            </p>
          

          </div>
         
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
