import Image from "next/image";
import Link from "next/link";
import React from "react";
import ReactTimeAgo from "react-time-ago";
import { IVideo } from "../interface";

interface IProps {
  video: IVideo;
}
const SearchSnippet = ({ video }: IProps) => {
  return (
    <Link href={`/watch?v=${video.id.videoId}`}>

        <div className="flex gap-x-3 cursor-pointer">
                {/* <img
                    loading="lazy"
                    src={video.snippet.thumbnails.medium.url}
                    height={video.snippet.thumbnails.medium.height}
                    width={video.snippet.thumbnails.medium.width}
                /> */}
            <Image
                className="w-1/2"
                src={video.snippet.thumbnails.medium.url ?? ""}
                height={180 ?? video.snippet.thumbnails.medium.height}
                width={320 ?? video.snippet.thumbnails.medium.width}
            />
            <div className="w-3/4">
                <h1 className="text-white text-xl  text-ellipsis">{video.snippet.title}</h1>
                <p className="text-gray-400">
                  <ReactTimeAgo date={video.snippet.publishedAt} />
                </p>
                <Link href="/">
                  <p className="text-gray-400 text-sm pt-2 hover:text-gray-300">
                    {video.snippet.channelTitle}
                  </p>
                </Link>
              
                <p className="text-gray-400 text-sm pt-3">
                  {video.snippet.description}
                </p>
            </div>
        </div>
    </Link>
    
  );
};

export default SearchSnippet;
