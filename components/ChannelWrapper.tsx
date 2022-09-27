import Image from "next/image";
import React from "react";
import { IChannelDetails } from "../interface";
import Avatar from "./Avatar";
import Body from "./Body";

interface IProps {
  children: React.ReactNode;
  channel: IChannelDetails;
}
const ChannelWrapper = ({ children, channel }: IProps) => {
  return (
    <div>
      <Image
        src={channel?.banner.desktop[0].url}
        height={channel?.banner.desktop[2].height}
        width={channel?.banner.desktop[2].width}
      />
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
        <button className="bg-[#c91515] text-white px-4 py-2 rounded-sm font-semibold text-sm">SUBSCRIBE</button>
      </div>
      {children}
    </div>
  );
};

export default ChannelWrapper;
