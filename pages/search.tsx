import { useRouter } from "next/router";
import React, { useState } from "react";
import Body from "../components/Body";
import SearchSnippet from "../components/SearchSnippet";
import useSearch from "../hooks/useSearch";
import useFetch from "../hooks/useSearch";
import { IVideo } from "../interface";

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
          .filter((item: IVideo) => item.type === "video")
          .map((item: IVideo) => (
            <SearchSnippet video={item} />
          ))}
      </div>
    </Body>
  );
};

export default SearchPage;
