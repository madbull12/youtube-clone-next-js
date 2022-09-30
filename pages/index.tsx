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
];

const VideoSnippet = ({ video }: { video: IVideoV3 }) => {
  const [onVideoHover, setOnVideoHover] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const saveToWatchLater = async (
    thumbnail: string,
    title: string,
    authorTitle: string,
    publishedAt: Date,
    videoId: string
  ) => {
    try {
      const data = { 
        thumbnail,
        title,
        authorTitle,
        publishedAt,
        videoId
       };

      await fetch("/api/watch-later", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.error(error);
    } 
  };

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
                  <div className="absolute top-full py-2 z-50 bg-zinc-800 text-white w-72 space-y-4 rounded-lg">
                    <button
                      className="flex items-center gap-x-3 py-1 hover:bg-zinc-600 px-4 w-full"
                      onClick={() =>
                        saveToWatchLater(
                          video?.snippet.thumbnails.medium.url,
                          video?.snippet.title,
                          video?.snippet.channelTitle,
                          video?.snippet.publishedAt,
                          video?.id.videoId
                        )
                      }
                    >
                      <AiFillClockCircle className="text-xl" />
                      Save to watch later
                    </button>
                    <button className="flex items-center gap-x-3 py-1 hover:bg-zinc-500 px-4 w-full">
                      <MdPlaylistAdd className="text-xl" />
                      Save to playlist
                    </button>
                  </div>
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
  return (
    <div>
      <Head>
        <title>Youtube</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Body>
        <div className="flex items-center gap-x-2 mb-6 [&>*]:cursor-pointer  ">
          {categories.map((item: string) => (
            <span
              onClick={() => setCategory(item)}
              className={`${item} text-white bg-zinc-700 border-zinc-500 px-2 py-1 border rounded-full hover:bg-zinc-500 transition-all duration-200 ease-in-out`}
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
