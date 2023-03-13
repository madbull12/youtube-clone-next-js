import Image from "next/legacy/image";
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
      <div className=" flex items-center flex-col lg:flex-row gap-y-4 justify-center mx-auto max-w-4xl  gap-x-16 cursor-pointer">
        <div className="md:w-32 md:h-32 w-24 h-24 relative">
          <Image
            src={channel.channel.avatar[1].url ?? ""}
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </div>
  
        <div className="max-w-sm lg:text-start text-center text-sm md:text-base">
          <p className="font-semibold text-white">{channel.channel.title}</p>
          <p className="text-sm text-gray-400">
            {channel.channel.stats.subscribersText}
          </p>
          <p className="text-sm text-gray-400">
            {channel.channel.descriptionSnippet}
          </p>
        </div>
        <button className="bg-[#CC00F00] rounded-sm text-white font-semibold px-4 lg:ml-auto py-2">
          Subscribe
        </button>
      </div>
    </Link>
  );
};

export default ChannelSnippet;
