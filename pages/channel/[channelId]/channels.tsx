import { useRouter } from "next/router";
import React from "react";
import Body from "../../../components/Body";
import ChannelWrapper from "../../../components/ChannelWrapper";
import useChannelChannels from "../../../hooks/useChannelChannels";
import { IChannel } from "../../../interface";
import { v4 as uuidv4 } from "uuid";
import Avatar from "../../../components/Avatar";

const ChannelChannelsPage = () => {
  const router = useRouter();
  const { channelId } = router.query;
  //   const { data:collections } = useChannelChannels(`?id=${channelId}`);

  const { data: collections } = useChannelChannels(`?id=${channelId}`);
  const { data: channelChannels } = useChannelChannels(
    `?id=${channelId}&filter=${collections?.collections[0]?.filter}`
  );

  console.log(channelChannels);
  return (
    <Body>
      <ChannelWrapper>
        <p className="text-white mt-8 text-lg">{collections?.collections[0]?.title}</p>
        <div className="p-8  grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {channelChannels?.contents?.map((channel: IChannel) => (
            <div key={uuidv4()} className="flex space-y-2 flex-col items-center">
              <Avatar
                src={channel.channel.avatar[2].url ?? ""}
                width={88}
                height={88}
              />
              <p className="text-white  font-semibold">
                {channel.channel.title}
              </p>
              <p className="text-sm text-gray-400">{channel.channel.stats.subscribersText}</p>
              <button className=" p-2  font-semibold text-gray-400 bg-zinc-800">
                SUBSCRIBE
              </button>
            </div>
          ))}
        </div>
      </ChannelWrapper>
    </Body>
  );
};

export default ChannelChannelsPage;
