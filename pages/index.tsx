import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import Body from "../components/Body";
import Header from "../components/Header";
import nFormatter from "../helper/convertion";
import useYoutubeHome from "../hooks/useYoutubeHome";
import { ISnippet, IVideoV3 } from "../interface";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiFillClockCircle } from "react-icons/ai";
import { MdPlaylistAdd } from "react-icons/md";
import useOutsideClick from "../hooks/useOutsideClick";
import saveToWatchLater from "../helper/saveToWatchLater";
import SaveDialog from "../components/SaveDialog";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import Backdrop from "../components/Backdrop";
import SaveToPlaylist from "../components/SaveToPlaylist";
import { useRecoilValue } from 'recoil'
import { isPlaylistDialogOpen } from "../atom/playlist";


const categories = [
  "Music",
  "Gaming",
  "Study",
  "Programming",
  "Japanese Music",
  "Podcasts",
  "K-POP",
  "NBA",
  "Action Movie",
  "Lo-fi",
  "Mixes",
  "Anime",
  "Health"
];

const VideoSnippet = ({ video }: { video: IVideoV3 }) => {
  const [onVideoHover, setOnVideoHover] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const session = useSession();
  
  return (
    <Link href={`/watch?v=${video.id.videoId}`}>
   
      <div
        className={`flex-col flex  gap-2 cursor-pointer`}
        onMouseEnter={() => setOnVideoHover(true)}
        onMouseLeave={() => setOnVideoHover(false)}
      >
        <div className="relative ">
          <Image
            src={video.snippet.thumbnails.medium.url ?? ""}
            height={video.snippet.thumbnails.medium.height ?? 200}
            objectFit="cover"
            width={video.snippet.thumbnails.medium.width ?? 200}
            className="w-1/2"
          />
          {/* <div className="bg-black opacity-75 text-white text-xs p-1 right-2 rounded-sm absolute bottom-2">
  {toHHMS(video.video.lengthSeconds?.toString())}
</div> */}
        </div>

        <div className={` space-y-2`}>
          <h1 className="text-sm  text-white ">{video.snippet.title}</h1>
      
          <div className="flex items-center justify-between gap-x-2">
            <p className="text-gray-400 text-sm">
              <ReactTimeAgo date={video.snippet.publishTime} />
            </p>
            {onVideoHover && (
              <div className="relative">
                <HiOutlineDotsVertical
                  className="text-gray-400 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDialogOpen(!dialogOpen);
                  }}
                />
                {dialogOpen && (
                  <SaveDialog 
                    saveToWatchLater={() => {
                      {session?.status === "authenticated" ? (
                      saveToWatchLater(
                        video.snippet.thumbnails.medium.url,
                        video.snippet.title,
                        video.snippet.channelTitle,
                        video.snippet.publishedAt.toString(),
                        video?.id.videoId
                      )
                      ):(
                        toast.error("Please login first to perform the action!")
                      )}
                     
                    }}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

const Home: NextPage = () => {
  const [category, setCategory] = useState("Music");
  const { data, loading, error } = useYoutubeHome(
    `/search?q=${category}&part=snippet,id&regionCode=US&maxResults=50`
  );
  console.log(data);
  const isPlaylistOpen = useRecoilValue(isPlaylistDialogOpen);

  return (
    <div>
      <Head>
        <title>Youtube</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {isPlaylistOpen && (
       <Backdrop>
            <SaveToPlaylist />
        </Backdrop> 
      )}

      <Body>
        <div className="flex items-center gap-x-2 mb-6 [&>*]:cursor-pointer overflow-x-scroll  ">
          {categories.map((item: string) => (
            <span
              onClick={() => setCategory(item)}
              className={`${item} whitespace-nowrap text-white bg-zinc-700 border-zinc-500 px-2 py-1 border rounded-full hover:bg-zinc-500 transition-all duration-200 ease-in-out`}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {data?.items?.map((video: IVideoV3) => (
            <VideoSnippet video={video} />
          ))}
        </div>
      </Body>
    </div>
  );
};

export default Home;
