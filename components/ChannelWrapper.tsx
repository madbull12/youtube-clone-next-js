import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useSWR from "swr";
import useChannelDetails from "../hooks/useChannelDetails";
import { IChannelDetails } from "../interface";
import Avatar from "./Avatar";
import Body from "./Body";
import NoImage from '../public/no-image.png'

interface IProps {
  children: React.ReactNode;
}

const ChannelWrapper = ({ children }: IProps) => {
  const router = useRouter();
  const { channelId } = router.query;
  // useEffect(()=>{
  //     router.replace("/")
  // },[]);
  const {
    data: channel,
    loading,
    error,
  } = useChannelDetails(`?id=${channelId}`);
  console.log(channel);

  if(loading) return <p>Loading...</p>

  return (
    <div>
      {channel.banner.desktop !== null ? (
      <Image
        src={channel?.banner.desktop[0].url}
        height={channel?.banner.desktop[2].height}
        width={channel?.banner.desktop[2].width}
      />
      ):(
        <Image
          src={NoImage}
          height={150}
          width={200}
      />
      )}
  
      <div className="flex items-center justify-between mt-4 px-8">
        <div className="flex items-center gap-x-4">
          <Avatar
            src={channel?.avatar[1].url}
            height={channel?.avatar[1].height}
            width={channel?.avatar[1].width}
          />
          <div>
            <p className="text-white text-lg">{channel?.title}</p>
            <p className="text-gray-400">{channel?.stats.subscribersText}</p>
          </div>
        </div>
        <button className="bg-[#c91515] text-white px-4 py-2 rounded-sm font-semibold text-sm">
          SUBSCRIBE
        </button>
      </div>
      <ul className="text-white font-semibold mt-4 flex items-center w-1/2 justify-between gap-x-4">
        <li
          className={` text-gray-400 ${
            router.pathname.includes("/feature")
              ? "font-semibold text-white border-b-2"
              : null
          }`}
        >
          <Link href={`/channel/${channelId}/feature`} scroll={false}>
            HOME
          </Link>
        </li>
        <li
          className={` text-gray-400 ${
            router.pathname.includes("/videos")
              ? "font-semibold text-white border-b-2"
              : null
          }`}
        >
          <Link href={`/channel/${channelId}/videos`}>VIDEOS</Link>
        </li>
        <li
          className={` text-gray-400 ${
            router.pathname.includes("/playlists")
              ? "font-semibold text-white border-b-2"
              : null
          }`}
        >
          <Link href={`/channel/${channelId}/playlists`}>PLAYLISTS</Link>
        </li>
        <li
          className={` text-gray-400 ${
            router.pathname.includes("/channels")
              ? "font-semibold text-white border-b-2"
              : null
          }`}
        >
          <Link href={`/channel/${channelId}/channels`}>CHANNELS</Link>
        </li>
        <li
          className={` text-gray-400 ${
            router.pathname.includes("/about")
              ? "font-semibold text-white border-b-2"
              : null
          }`}
        >
          <Link href={`/channel/${channelId}/about`}>ABOUT</Link>
        </li>
      </ul>
      {children}
    </div>
  );
};

export default ChannelWrapper;
