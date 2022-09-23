import moment from "moment";
import { useRouter } from "next/router";
import React from "react";
import Body from "../components/Body";
import useFetch from "../hooks/useFetch";

const VideoPage = () => {
  const router = useRouter();
  const { v } = router.query;

  const { data, loading, error } = useFetch(
    `videos?part=contentDetails,snippet,statistics&id=${v}`
  );

//   const { data:channelData } = useFetch(`channels?part=snippet,statistics&id=${data?.items[0]?.snippet?.channelId}`)

  console.log(data);
//   console.log(channelData)
  return (
    <Body>
      <div className="flex gap-x-2">
        <div className="w-[60%] space-y-2">
          <iframe
            height={400}
            className="w-full "
            src={`https://www.youtube.com/embed/${v}`}
          ></iframe>
          <h1 className="text-xl text-white">{data?.items[0]?.snippet?.title}</h1>
          <div className="gap-x-3 flex items-center">
            <p className="text-gray-400 ">
                {Number(data?.items[0]?.statistics?.viewCount).toLocaleString()} views
            </p>
            <p className="text-gray-400 text-sm">
                {moment(data?.items[0]?.snippet?.publishedAt).format("ll")}
            </p>
          </div>
       
        </div>
      </div>
    </Body>
  );
};

export default VideoPage;
