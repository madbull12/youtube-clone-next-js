import React from "react";
import nFormatter from "../helper/convertion";
import { IVideo } from "../interface";

interface IProps {
  video: IVideo;
}
const HomeVideo = ({ video }: IProps) => {
  return (
    <div className="flex flex-col w-full md:flex-row gap-4">
      <iframe
        height={300}
        className="w-full rounded-xl flex-[0.5]"
        src={`https://www.youtube.com/embed/${video.video.videoId}`}
      ></iframe>
      <div className="flex-[0.5] space-y-4">
        <p className="text-white">{video.video.title}</p>
        <div className="flex items-center gap-x-2 text-gray-500 text-sm">
          <p>{nFormatter(video.video.stats.views)} Views</p>
          <p>{video.video.publishedTimeText}</p>
        </div>
        <p>{video.video.descriptionSnippet}</p>

      </div>
    </div>
  );
};

export default HomeVideo;
