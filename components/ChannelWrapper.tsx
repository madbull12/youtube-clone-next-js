import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import useChannelDetails from "../hooks/useChannelDetails";
import { IChannelDetails } from "../interface";
import Avatar from "./Avatar";
import Body from "./Body";
import NoImage from "../public/no-image.png";
import useChannelChannels from "../hooks/useChannelChannels";
import useMediaQuery from "../hooks/useMediaQuery";

interface IProps {
  children: React.ReactNode;
}

const ChannelWrapper = ({ children }: IProps) => {
  const router = useRouter();
  const { channelId } = router.query;
  const isNotMobile = useMediaQuery("(min-width:768px)");
  // useEffect(()=>{
  //     router.replace("/")
  // },[]);
  const {
    data: channel,
    loading,
    error,
  } = useChannelDetails(`?id=${channelId}`);

  if (loading) return <p>Loading...</p>;

  return (
    <>
      {channel !== null && (
        <div>
          {channel.banner.desktop !== null ? (
            <Image
              alt="thumbnail"
              src={channel?.banner.desktop[0].url}
              height={channel?.banner.desktop[2].height}
              width={channel?.banner.desktop[2].width}
            />
          ) : (
            <Image alt="thumbnail" src={NoImage} height={150} width={200} />
          )}

          <div className="flex items-center justify-between mt-4 px-8">
            <div className="flex items-start md:items-center gap-x-4 flex-col md:flex-row">
              <Avatar
                src={channel?.avatar[1].url}
                height={
                  isNotMobile
                    ? channel?.avatar[1].height
                    : channel?.avatar[0].height
                }
                width={
                  isNotMobile
                    ? channel?.avatar[1].width
                    : channel?.avatar[0].width
                }
              />
              <div>
                <p className="text-white text-base md:text-lg">
                  {channel?.title}
                </p>
                <p className="text-gray-400 text-xs md:text-sm">
                  {channel?.stats.subscribersText}
                </p>
              </div>
            </div>
            <button className="bg-[#c91515] text-white px-4 py-2 rounded-sm font-semibold text-sm">
              SUBSCRIBE
            </button>
          </div>
          <ul className="text-white font-semibold text-xs sm:text-sm md:text-base mt-4 flex items-center justify-around gap-2 md:gap-4 flex-wrap">
            <li
              className={` text-gray-400 ${
                router.pathname.includes("/feature")
                  ? "font-semibold text-white border-b-2"
                  : null
              }`}
            >
              <Link
                href={`/channel/${channelId}/feature`}
                as={`/channel/${channelId}/feature`}
              >
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
              <Link
                href={`/channel/${channelId}/videos`}
                as={`/channel/${channelId}/videos`}
              >
                VIDEOS
              </Link>
            </li>
            <li
              className={` text-gray-400 ${
                router.pathname.includes("/playlists")
                  ? "font-semibold text-white border-b-2"
                  : null
              }`}
            >
              <Link
                href={`/channel/${channelId}/playlists`}
                as={`/channel/${channelId}/playlists`}
              >
                PLAYLISTS
              </Link>
            </li>
            <li
              className={` text-gray-400 ${
                router.pathname.includes("/channels")
                  ? "font-semibold text-white border-b-2"
                  : null
              }`}
            >
              <Link
                href={`/channel/${channelId}/channels`}
                as={`/channel/${channelId}/channels`}
              >
                CHANNELS
              </Link>
            </li>
            <li
              className={` text-gray-400 ${
                router.pathname.includes("/about")
                  ? "font-semibold text-white border-b-2"
                  : null
              }`}
            >
              <Link
                href={`/channel/${channelId}/about`}
                as={`/channel/${channelId}/about`}
              >
                ABOUT
              </Link>
            </li>
          </ul>
          {children}
        </div>
      )}
    </>
  );
};

export default ChannelWrapper;
