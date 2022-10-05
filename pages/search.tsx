import { useRouter } from "next/router";
import React, { useState,useEffect } from "react";
import Body from "../components/Body";
import SearchSnippet from "../components/SearchSnippet";
import useSearch from "../hooks/useSearch";
import useFetch from "../hooks/useSearch";
import { IChannel, IVideo, IVideoDetails, IVideoInfo } from "../interface";
import { v4 as uuidv4 } from "uuid";
import ChannelSnippet from "../components/ChannelSnippet";
import { AiFillFilter } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { isPlaylistDialogOpen } from "../atom/playlist";
import Backdrop from "../components/Backdrop";
import SaveToPlaylist from "../components/SaveToPlaylist";

type Props = {
  item: IVideo | IChannel;
};

const SearchPage = () => {
  const router = useRouter();
  const { results } = router.query;
  const [cursorToken, setCursorToken] = useState<string>("");
  const [didYouMean, setDidYouMean] = useState<string | null>(null);
  const [filterClicked,setFilterClicked] = useState<boolean>(false);
  const isPlaylistOpen = useRecoilValue(isPlaylistDialogOpen);

  useEffect(()=>{
    setCursorToken("")
  },[router.pathname]);

  // const {data,loading,error} = useFetch(`search?q=${results}&part=snippet,id&maxResults=50`);
  const { data, loading, error } = useSearch(
    `?q=${didYouMean ? didYouMean : results}&cursor=${cursorToken}`
  );

  console.log(data);

  if (error) {
    console.log(error);
  }

  return (
    <Body>
        {isPlaylistOpen && (
        <Backdrop>
          <SaveToPlaylist />
        </Backdrop>
      )}
      <div className="flex flex-col space-y-4  ">
        {/* {data?.contents.map((item:IVideo)=>(
                <SearchSnippet video={item} />
            ))} */}
        <button onClick={()=>setFilterClicked(!filterClicked)} className="font-semibold text-gray-400 flex items-center">
          <AiFillFilter />
          <span>FILTERS</span>
        </button>
        <div className={` ${filterClicked ? "block" : "hidden"}`}>
          <div className="flex gap-x-8 justify-between  ">
            {data?.filterGroups.map((item: any) => (
              <div>
                <p className="text-white font-semibold uppercase text-sm border-b border-gray-400">
                  {item.title}
                </p>
                <div className="pt-4 space-y-3 cursor-pointer">
                  {item.filters.map((filter: any) => (
                    <p
                      onClick={()=>setCursorToken(filter.cursorSelect)}
                      className={`${
                        filter.selected ? "text-white" : "text-gray-400"
                      }  text-sm`}
                    >
                      {filter.label}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <>
          {data?.didYouMean && (
            <p className="text-white">
              Did you mean{" "}
              <span
                onClick={() => setDidYouMean(data?.didYouMean)}
                className="font-semibold cursor-pointer"
              >
                {data?.didYouMean}?
              </span>
            </p>
          )}
        </>
        <div>
          {data?.contents
            .filter((item: IChannel) => item.type === "channel")
            .map((item: IChannel) => (
              <div className="py-6" key={uuidv4()}>
                <ChannelSnippet channel={item} />
              </div>
            ))}
        </div>

        <div className="py-8 space-y-4">
          {data?.contents
            .filter((item: IVideo) => item.type === "video")
            .map((item: IVideo) => (
              <SearchSnippet video={item} key={uuidv4()} />
            ))}
        </div>
      </div>
    </Body>
  );
};

export default SearchPage;
