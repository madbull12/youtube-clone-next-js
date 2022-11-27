import Image from "next/image";
import React from "react";
import { IChannel } from "../interface";
import nFormatter from "../helper/convertion";
import Link from "next/link";

interface IProps {
  channel: IChannel;
}
const ChannelSnippet = ({ channel }: IProps) => {
  console.log(channel);
  return (
    <Link href={`/channel/${channel.channel.channelId}/feature`}>
      <div className=" flex items-center mx-auto max-w-4xl  gap-x-16 cursor-pointer">
        <div className="w-32 h-32 relative">
          <Image
            src={channel.channel.avatar[1].url ?? ""}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
  
        <div className="max-w-sm">
          <p className="font-semibold text-white">{channel.channel.title}</p>
          <p className="text-sm text-gray-400">
            {channel.channel.stats.subscribersText}
          </p>
          <p className="text-sm text-gray-400">
            {channel.channel.descriptionSnippet}
          </p>
        </div>
        <button className="bg-[#CC0000] rounded-sm text-white font-semibold px-4 ml-auto py-2">
          Subscribe
        </button>
      </div>
    </Link>
  );
};

export default ChannelSnippet;
