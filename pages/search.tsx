import { useRouter } from "next/router";
import React, { useState } from "react";
import Body from "../components/Body";
import SearchSnippet from "../components/SearchSnippet";
import useSearch from "../hooks/useSearch";
import useFetch from "../hooks/useSearch";
import { IChannel, IVideo } from "../interface";
import { v4 as uuidv4 } from 'uuid'
import ChannelSnippet from "../components/ChannelSnippet";


type Props= {
  item:IVideo | IChannel
}

const SearchPage = () => {
  const router = useRouter();
  const { results } = router.query;
  const [didYouMean,setDidYouMean] = useState<string | null>(null);

  // const {data,loading,error} = useFetch(`search?q=${results}&part=snippet,id&maxResults=50`);
  const { data, loading, error } = useSearch(`?q=${didYouMean ? didYouMean : results}`);

  console.log(data);

  if (error) {
    console.log(error);
  }

  return (
    <Body>
      <div className="flex flex-col space-y-4">
        {/* {data?.contents.map((item:IVideo)=>(
                <SearchSnippet video={item} />
            ))} */}
        <>
          {data?.didYouMean && (
            <p className="text-white">
              Did you mean <span onClick={()=>setDidYouMean(data?.didYouMean)} className="font-semibold cursor-pointer">
              {data?.didYouMean}?
              </span>
             
            </p>
          )}
        </>
        {data?.contents
          // .filter((item: IVideo) => item.type === "video")
          .map((item:any) => (
            <>
               {item.type === "video" ? (
                  <SearchSnippet key={uuidv4()} video={item} />

                ):(
                  <>
                    {item.type === "channel" ? (
                      <ChannelSnippet key={uuidv4()} channel={item} />
                    ):(
                      <>
                        {item.type==="playlist" ? (
                          <h1>damn</h1>
                        ):null}
                      
                      </>
                
                    )}
                  </>
                )}    
            </>
         
          ))}
      </div>
    </Body>
  );
};

export default SearchPage;
