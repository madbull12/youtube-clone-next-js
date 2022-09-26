import Image from "next/image";
import React from "react";
import { IChannel } from "../interface";
import nFormatter from '../helper/convertion'

interface IProps {
  channel: IChannel;
}
const ChannelSnippet = ({ channel }: IProps) => {
    console.log(channel)
  return (
    <div className=" flex items-center justify-center gap-x-16">
      <Image
        src={channel.channel.avatar[1].url ?? ""}
        width={channel.channel.avatar[1].width}
        height={channel.channel.avatar[1].height}
        className="rounded-full"
      />
      <div>
        <p className="font-semibold text-white">{channel.channel.title}</p>
        <p className="text-sm text-gray-400">{channel.channel.stats.subscribersText}</p>
        <p className="text-sm text-gray-400">{channel.channel.descriptionSnippet}</p>
      </div>
      <button className="bg-[#CC0000] rounded-sm text-white font-semibold px-4 py-2">Subscribe</button>
    </div>
  );
};

export default ChannelSnippet;