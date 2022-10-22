import { useRouter } from "next/router";
import React,{ useState } from "react";
import Body from "../../../components/Body";
import ChannelWrapper from "../../../components/ChannelWrapper";
import VideoSnippet from "../../../components/VideoSnippet";
import useChannelVideos from "../../../hooks/useChannelVideos";
import { v4 as uuidv4 } from "uuid";
import { IVideo } from "../../../interface";
import { BsFilterLeft } from "react-icons/bs";

const ChannelVideos = () => {
  const router = useRouter();

  const { channelId } = router.query;
  const [filtering,setFiltering] = useState<string>("");

  const { data: channelVideos } = useChannelVideos(filtering === "" ? `?id=${channelId}` :`?id=${channelId}&filter=${filtering}` );

  const [openSortBy,setOpenSortBy] = useState<boolean>(false);
  console.log(channelVideos)

  return (
    <Body>
      <ChannelWrapper>
      <button onClick={()=>setOpenSortBy(!openSortBy)} className="relative font-semibold mt-3 ml-auto text-white flex items-center gap-x-2">
          <BsFilterLeft className="text-2xl text-white" />
          <span>SORT BY</span>
          {openSortBy && (
            <div  className="p-2 text-sm rounded-sm items-start absolute z-50 top-full flex flex-col w-44 right-0 text-white bg-neutral-800">
            <p className="p-2 hover:bg-gray-400 w-full text-left" onClick={()=>setFiltering("uploads_popular")}>
                Most popular
            </p>
            <p className="p-2 hover:bg-gray-400 w-full text-left" onClick={()=>setFiltering("uploads_latest")}>
                Date added(newest)
            </p>
            <p className="p-2 hover:bg-gray-400 w-full text-left" onClick={()=>setFiltering("uploads_oldest")}>
                Date added(oldest)
            </p>
            </div>
          )}
   
        </button>

        <div className="mt-4 grid gap-x-2 gap-y-4 grid-cols-5 bg-black p-4">
          {channelVideos?.contents.map((video: IVideo) => (
            <VideoSnippet video={video} column={true} key={uuidv4()} />
          ))}
        </div>
      </ChannelWrapper>
        
    </Body>
  );
};

export default ChannelVideos;
