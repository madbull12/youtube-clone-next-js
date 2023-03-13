import { unstable_getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import Image from "next/legacy/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { MdPlaylistPlay } from "react-icons/md";
import ReactTimeAgo from "react-time-ago";
import Avatar from "../components/Avatar";
import Body from "../components/Body";
import { IPlaylist, IVideoV3, PlaylistVideo } from "../interface";
import { authOptions } from "./api/auth/[...nextauth]";
import { v4 as uuidv4, v4 } from "uuid";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BiLoaderAlt } from "react-icons/bi";
import { trpc } from "../utils/trpc";
import { Prisma } from "@prisma/client";
import PlaylistComponent from "../components/PlaylistComponent";

const ProfilePage = () => {
  // const {
  //   isLoading:userWatchLaterVideosLoading,
  //   error: userWatchLaterVideosError,
  //   data: userWatchLaterVideos,
  // } = useQuery({
  //   queryKey: ["watchLaterVideos"],
  //   queryFn: () => axios.get(`/api/watch-later`).then((res)=>res.data),
  // });

  const { data: userPlaylists, isLoading: userPlaylistsLoading } =
    trpc.playlist.userPlaylists.useQuery();
  const { data: userWatchLaterVideos, isLoading: userWatchLaterVideosLoading } =
    trpc.watchLater.userWatchLater.useQuery();
  const { data: session } = useSession();
  const [showMore, setShowMore] = useState<number>(5);

  return (
    <Body>
      <>
        <div className="flex items-center gap-x-4">
          <Avatar src={session?.user?.image ?? ""} width={80} height={80} />
          <p className="text-xl text-white">{session?.user?.name}</p>
        </div>
        <div>
          <div className="flex  mt-8 gap-x-4 items-center">
            <AiFillClockCircle className="text-white" />
            <p className=" text-xl text-white">Watch later</p>
          </div>
          <div>
            {userWatchLaterVideosLoading ? (
              <BiLoaderAlt className="animate-spin text-red-600 text-xl" />
            ) : null}
            {userWatchLaterVideos?.length === 0 ? (
              <p className="text-white text-lg">No videos saved</p>
            ) : (
              <div className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
                {userWatchLaterVideos?.slice(0, showMore).map((video: any) => (
                  <Link href={`/watch?v=${video.videoId}`} key={v4()}>
                    <div className="flex flex-col cursor-pointer space-y-2">
                      <Image
                        src={video.thumbnail}
                        width={320}
                        height={180}
                        className="rounded-xl"
                      />
                      <p className="text-white">{video.title}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-gray-400 text-sm">
                          {video.authorTitle}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={() => {
              {
                (userWatchLaterVideos?.length as number) < showMore
                  ? setShowMore((prev) => prev - 5)
                  : setShowMore((prev) => prev + 5);
              }
            }}
            className={`${
              (userWatchLaterVideos?.length as number) <= 5 ? "hidden" : "block"
            } bg-transparent border border-blue-500 px-4 py-2 mt-4 text-white uppercase font-semibold`}
          >
            {(userWatchLaterVideos?.length as number) < showMore
              ? "Show less"
              : "Show more"}
          </button>
        </div>
        <div className="mt-8">
          <div className="text-white flex items-center gap-x-4">
            <MdPlaylistPlay />
            <h1 className="text-xl">Playlists</h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
            {userPlaylistsLoading ? (
              <BiLoaderAlt className="animate-spin text-red-600 text-xl" />
            ) : null}

            {userPlaylists?.length === 0 ? (
              <p className="text-white text-lg">No playlists created</p>
            ) : (
              <>
                {userPlaylists?.map((playlist) => (
                  <PlaylistComponent key={v4()} playlist={playlist} />
                ))}
              </>
            )}
          </div>
        </div>
      </>
    </Body>
  );
};

export default ProfilePage;
