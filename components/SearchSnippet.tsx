import Image from "next/image";
import React from "react";
import { IVideo } from "../interface";

interface IProps {
  video: IVideo;
}
const SearchSnippet = ({ video }: IProps) => {
  return (
    <div className="flex gap-x-3">
      <Image
        src={video.snippet.thumbnails.medium.url}
        height={video.snippet.thumbnails.medium.height}
        width={video.snippet.thumbnails.medium.width}
      />
    </div>
  );
};

export default SearchSnippet;
