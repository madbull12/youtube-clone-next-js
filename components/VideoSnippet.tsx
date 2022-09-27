import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import nFormatter from "../helper/convertion";
import { ISnippet, IVideo, IVideoDetails, IVideoInfo } from "../interface";
import Avatar from "./Avatar";

interface IProps {
  video: IVideo;
  column:boolean;
}
const VideoSnippet = ({ video,column }: IProps) => {
  return (
    <Link href={`/watch?v=${video.video.videoId}`}>
      <div className={`${column ? "flex-col": "flex-row"} flex  gap-2 cursor-pointer`}>
        <Image
          src={video?.video.thumbnails[3].url}
          height={video?.video.thumbnails[3].height}
          objectFit="cover"
          width={video?.video.thumbnails[3].width}
        
          className="w-1/2"
        />
        <div className={`${column ? "w-full" : " w-1/2"} space-y-2`}>
          <h1 className="text-md  text-white">{video.video.title}</h1>
          {video.video.author && (
              <Link href="/">
                <div className="flex items-center gap-x-2">
                  <Avatar src={video.video.author?.avatar[0].url ?? ""} width={30} height={30} />
                  <p className="text-gray-400 text-sm">
                    {video.video.author?.title}
                  </p>
                </div>
            
            </Link>
          )}
     
          <div className="flex items-center gap-x-2">
            <p className="text-gray-400 text-sm">
              {nFormatter(video.video.stats.views)} views
            </p>
            <p className="text-gray-400 text-sm">
              {video.video.publishedTimeText}
            </p>
          </div>
       
        </div>
      </div>
    </Link>
  );
};

export default VideoSnippet;
