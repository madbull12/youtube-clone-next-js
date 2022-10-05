import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { getSession, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { MdPlaylistPlay } from "react-icons/md";
import ReactTimeAgo from "react-time-ago";
import Avatar from "../components/Avatar";
import Body from "../components/Body";
import { IPlaylist, IVideoV3, PlaylistVideo } from "../interface";
import { authOptions } from "./api/auth/[...nextauth]";
import { v4 as uuidv4 } from 'uuid'

interface IProps {
  videosList: any;
  userPlaylists: IPlaylist[];
}

const ProfilePage = ({ videosList, userPlaylists }: IProps) => {
  console.log(userPlaylists);
  const { data: session } = useSession();
  const [showMore, setShowMore] = useState<number>(5);
  console.log(videosList);
  return (
    <Body>
      <div className="flex items-center gap-x-4">
        <Avatar src={session?.user?.image ?? ""} width={80} height={80} />
        <p className="text-xl text-white">{session?.user?.name}</p>
      </div>
      <div>
        <div className="flex  mt-8 gap-x-4 items-center">
          <AiFillClockCircle className="text-white" />
          <p className=" text-xl text-white">Watch later</p>
        </div>
        <div className="grid grid-cols-5 gap-4 mt-4">
          {videosList.length === 0 ? (
            <p className="text-white text-lg">No videos saved</p>
          ) : (
            <>
              {videosList?.slice(0, showMore).map((video: any) => (
                <Link href={`/watch?v=${video.videoId}`}>
                  <div className="flex flex-col cursor-pointer space-y-2">
                    <Image src={video.thumbnail} width={320} height={180} />
                    <p className="text-white">{video.title}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-400 text-sm">
                        {video.authorTitle}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
        <button
          onClick={() => {
            {
              videosList.length < showMore
                ? setShowMore((prev) => prev - 5)
                : setShowMore((prev) => prev + 5);
            }
          }}
          className={`${
            videosList.length === 5 ? "hidden" : "block"
          } bg-transparent border border-blue-500 px-4 py-2 mt-4 text-white uppercase font-semibold`}
        >
          {videosList.length < showMore ? "Show less" : "Show more"}
        </button>
      </div>
      <div className="mt-8">
        <div className="text-white flex items-center gap-x-4">
          <MdPlaylistPlay />
          <h1 className="text-xl">Playlists</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
            {userPlaylists.length === 0 ? (
                <p className="text-white text-lg">No playlists created</p>
              ) : (
                <>
                  {userPlaylists.map((playlist: IPlaylist) => (
                    <div key={uuidv4()} className="relative">
                        <Link href={`/`}>
                          <div className="flex flex-col cursor-pointer space-y-2">
                            <div className="relative ">
                              <Image  src={playlist.saved[0].thumbnail} width={320} height={180} />

                              <div className="bg-neutral-900 grid place-items-center absolute opacity-75 right-0 top-0 bottom-0 w-1/3">

                                <div className="text-white flex-col flex gap-y-2 items-center">
                                  <p className="text-lg">{playlist.saved.length}</p>

                                  <MdPlaylistPlay className="text-3xl"  />
                                </div>


                              </div>
                                
                            </div>
                            <p className="text-white">{playlist.title}</p>
                            <p className="text-gray-400 font-semibold">
                              VIEW FULL PLAYLIST
                            </p>

                          </div>
                        </Link>
                       
                    </div>
                
                  ))}
                </>
              )}
        </div>
      </div>
    </Body>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );
  const userPlaylists = await prisma?.playlist.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
    include: {
      saved: {
        select: {
          thumbnail: true,
        },
      },
    },
  });
  const videosList = await prisma?.watchLater.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  console.log(userPlaylists);

  return {
    props: {
      videosList: JSON.parse(JSON.stringify(videosList)),
      userPlaylists: JSON.parse(JSON.stringify(userPlaylists)),
    },
  };
};

export default ProfilePage;
