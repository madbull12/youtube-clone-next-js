import Image from "next/image";
import React from "react";
import { ISnippet, IVideo } from "../interface";

interface IProps {
  video: IVideo;
}
const SuggestedSnippet = ({ video }: IProps) => {
  return (
    <div className="flex gap-x-2">
      <Image
        src={video.snippet.thumbnails.medium.url}
        height={120}
        objectFit="cover"
        width={160}
        className="w-1/2"
      />
      <div className="w-1/2">
        <h1 className="text-lg text-white">{video.snippet.title}</h1>

      </div>
    </div>
  );
};

export default SuggestedSnippet;
