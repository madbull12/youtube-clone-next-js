import Image from "next/image";
import Link from "next/link";
import React from "react";
import { IVideo } from "../interface";

interface IProps {
  video: IVideo;
}
const SearchSnippet = ({ video }: IProps) => {
  return (
    <Link href="/">

        <div className="flex gap-x-3 cursor-pointer">
                {/* <img
                    loading="lazy"
                    src={video.snippet.thumbnails.medium.url}
                    height={video.snippet.thumbnails.medium.height}
                    width={video.snippet.thumbnails.medium.width}
                /> */}
            <Image
                src={video.snippet.thumbnails.medium.url ?? ""}
                height={video.snippet.thumbnails.medium.height ?? 180}
                width={video.snippet.thumbnails.medium.width ?? 320}
            />
            <div>
                <h1 className="text-white text-2xl">{video.snippet.title}</h1>
            </div>
        </div>
    </Link>
    
  );
};

export default SearchSnippet;
