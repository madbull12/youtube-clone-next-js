import { SavedVideo } from "@prisma/client";
import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { v4 } from "uuid";
import { PlaylistWithPayload } from "../types";

const PlaylistBox = ({ playlist }: { playlist: PlaylistWithPayload }) => {
  console.log(playlist);
  return (
    <div className="rounded-xl  border overflow-hidden border-gray-400 mb-4">
      <div className="p-4 bg-neutral-800 ">
        <h1 className="font-bold text-lg text-white">{playlist?.title}</h1>
        <p className="text-sm text-white">{playlist?.user?.name}</p>
      </div>
      <div className="space-y-4 py-4 px-1">
        {playlist?.saved.map((video, i) => (
          <PlaylistVideo video={video} index={i} key={v4()} />
        ))}
      </div>
    </div>
  );
};

interface IProps {
  index: number;
  video: SavedVideo;
}

const PlaylistVideo = ({ index, video }: IProps) => {
  const router = useRouter();

  const { query } = router
  return (
    <Link href={{
      pathname:router.pathname,
      query:{...query, v:video.videoId}
    }} className="flex   gap-x-2  items-start ">
      <span className="text-gray-500 hidden md:flex">{index + 1}</span>
      <div className="w-1/3 relative h-20">
        <Image
          src={video.thumbnail}
          objectFit="cover"
          layout="fill"
          className="rounded-xl"
        />
      </div>
      <div>
        <p className="text-white text-sm md:text-base">{video.title}</p>
        <p className="text-xs md:text-sm text-gray-500">{video.authorTitle}</p>
      </div>
    </Link>
  );
};

export default PlaylistBox;
