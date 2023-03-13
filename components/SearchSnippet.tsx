import { useSession } from "next-auth/react";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { HiOutlineDotsVertical } from "react-icons/hi";
import ReactTimeAgo from "react-time-ago";
import { useRecoilState } from "recoil";
import { videoState } from "../atom/video";
import nFormatter from "../helper/convertion";
import toHHMS from "../helper/toHHMS";
import useOutsideClick from "../hooks/useOutsideClick";
import { IVideo, IVideoDetails, PlaylistVideo } from "../interface";
import Avatar from "./Avatar";
import MenuHorizontal from "./MenuHorizontal";
import SaveDialog from "./SaveDialog";

interface IProps {
  video: IVideo;
}
const SearchSnippet = ({ video }: IProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const session = useSession();
  const [_videoState, setVideoState] = useRecoilState(videoState);
  console.log(video);

  const ref = useRef(null);

  useOutsideClick(ref, () => {
    setDialogOpen(false);
  });

  const saveVideoProps = {
    videoId: video.video.videoId,
    thumbnail: video.video.thumbnails[1]?.url,
    title: video.video.title,
    authorTitle: video.video.author.title,
    publishedTimeText: video.video.publishedTimeText,
  };

  return (
    <Link href={`/watch?v=${video?.video?.videoId}`}>
      <div className="flex gap-x-3 cursor-pointer">
        {/* <img
                    loading="lazy"
                    src={video.snippet.thumbnails.medium.url}
                    height={video.snippet.thumbnails.medium.height}
                    width={video.snippet.thumbnails.medium.width}
                /> */}
        <div className="relative w-1/2 h-24 sm:h-36 md:w-1/3 lg:w-1/4 md:h-44 ">
          <Image
            src={video.video.thumbnails[0].url}
            layout="fill"
            className="rounded-xl"
            objectFit="cover"
          />
          <div className="bg-black opacity-75 text-white text-xs p-1 right-2 rounded-sm absolute bottom-2">
            {toHHMS(video.video.lengthSeconds?.toString())}
          </div>
        </div>

        <div className="w-3/4 md:space-y-2 space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="text-white text-sm sm:text-lg md:text-xl  text-ellipsis">
              {video.video.title}
            </h1>

            {session.status === "authenticated" ? (
              <div
                onClick={(e) => {
                  e.preventDefault()
                  setDialogOpen(!dialogOpen);
                  setVideoState(saveVideoProps)

                }}
              >
                <MenuHorizontal />
                {dialogOpen ? <SaveDialog {...saveVideoProps} /> : null}
              </div>
            ) : null}
          </div>

          <div className="flex gap-x-3 items-center text-xs md:text-sm">
            <p className="text-gray-400">
              {nFormatter(video?.video.stats.views)} views
            </p>
            <p className="text-gray-400">{video?.video.publishedTimeText}</p>
          </div>

          <Link href={`/channel/${video.video.author.channelId}/feature`}>
            <div className="flex gap-x-2 items-center">
              <Avatar
                src={video.video.author?.avatar[0].url ?? ""}
                width={30}
                height={30}
              />
              <p className="text-gray-400 text-xs md:text-sm pt-2 hover:text-gray-300">
                {video.video.author?.title}
              </p>
            </div>
          </Link>

          <p className="text-gray-400 text-sm sm:block hidden pt-3">
            {video?.video.descriptionSnippet}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SearchSnippet;
