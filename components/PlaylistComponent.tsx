import Image from "next/legacy/image";
import Link from "next/link";
import React from "react";
import { MdPlaylistPlay } from "react-icons/md";
import { PlaylistWithPayload } from "../types";

const PlaylistComponent = ({ playlist }:{ playlist:PlaylistWithPayload}) => {
  return (
    <div className="relative">
      <Link href={`/watch?v=${playlist.saved[0].videoId}&list=${playlist.id}`}>
        <div className="flex flex-col cursor-pointer space-y-2">
          <div className="relative ">
            <Image
              src={playlist?.saved[0].thumbnail}
              width={320}
              height={180}
              className="rounded-xl"
            />

            <div className="bg-neutral-900 grid place-items-center absolute opacity-75 right-0 top-0 bottom-0 w-1/3">
              <div className="text-white flex-col flex gap-y-2 items-center">
                <p className="text-lg">{playlist.saved.length}</p>

                <MdPlaylistPlay className="text-3xl" />
              </div>
            </div>
          </div>
          <p className="text-white">{playlist.title}</p>
          <p className="text-gray-400 font-semibold">VIEW FULL PLAYLIST</p>
        </div>
      </Link>
    </div>
  );
};

export default PlaylistComponent;
