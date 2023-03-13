import { useSession } from "next-auth/react";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { useRecoilState } from "recoil";
import { videoState } from "../atom/video";
import nFormatter from "../helper/convertion";
import toHHMS from "../helper/toHHMS";
import { ISnippet, IVideo, IVideoDetails, IVideoInfo } from "../interface";
import Avatar from "./Avatar";
import MenuHorizontal from "./MenuHorizontal";
import SaveDialog from "./SaveDialog";

interface IProps {
  video: IVideo;
  column: boolean;
}
const VideoSnippet = ({ video, column }: IProps) => {
  const session = useSession();

  return (
    <Link href={`/watch?v=${video.video.videoId}`}>
      <div
        className={`${
          column ? "flex-col" : "flex-row"
        } flex  gap-2 cursor-pointer`}
      >
        <div className="relative ">
          <Image
            src={
              video?.video.thumbnails[3]?.url ?? video?.video.thumbnails[0].url
            }
            height={
              video?.video.thumbnails[3]?.height ??
              video?.video.thumbnails[0].height
            }
            objectFit="cover"
            width={
              video?.video.thumbnails[3]?.width ??
              video?.video.thumbnails[0].width
            }
            className="w-full rounded-xl"
          />
          <div className="bg-black opacity-75 text-white text-xs p-1 right-2 rounded-sm absolute bottom-2">
            {toHHMS(video.video.lengthSeconds?.toString())}
          </div>
        </div>

        <div
          className={`${
            column ? "w-full" : " w-1/2"
          } space-y-1 overflow-hidden`}
        >
            <h1 className="text-sm md:text-base  text-white">
              {video.video.title}
            </h1>


          {video.video.author && (
            <Link href="/">
              <div className="flex items-center gap-x-2 ">
                {/* <Avatar src={video.video.author?.avatar[0].url ?? ""} width={30} height={30} /> */}
                <p className="text-gray-400 text-xs md:text-sm">
                  {video.video.author?.title}
                </p>
              </div>
            </Link>
          )}

          <div className="flex items-center gap-x-2 text-xs md:text-sm">
            <p className="text-gray-400">
              {nFormatter(video.video.stats.views)} views
            </p>
            <p className="text-gray-400 ">{video.video.publishedTimeText}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoSnippet;
