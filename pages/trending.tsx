import Image from "next/legacy/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { v4 } from "uuid";
import Body from "../components/Body";
import nFormatter from "../helper/convertion";
import useTrending from "../hooks/useTrending";
import { ITrending } from "../interface";
import TrendingLogo from "../public/trending_avatar.png";

interface IProps {
  trending: ITrending;
}
const TrendingVideo = ({ trending }: IProps) => {
  return (
    <Link href={`/watch?v=${trending.videoId}`}>
      <div className="flex gap-3 w-full   flex-col sm:flex-row cursor-pointer">
        <div className="relative w-full h-44 sm:w-1/3">
          <Image
            src={trending.thumbnail[2].url}
            // width={trending.thumbnail[1].width}
            // height={trending.thumbnail[1].height}
            layout="fill"
            className=" rounded-xl"
            objectFit="cover"
          />
        </div>

        <div className="w-2/3">
          <h1 className="text-white text-base md:text-lg">{trending.title}</h1>
          <div className="text-gray-400 text-xs md:text-sm flex items-center gap-x-2">
            <p>{trending.channelTitle}</p>
            <p>{nFormatter(parseInt(trending.viewCount))}</p>
            <p>{trending.publishedText}</p>
          </div>
          <p className="mt-3 text-xs md:text-base text-gray-400">
            {trending.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

const TrendingPage = () => {
  const router = useRouter();
  console.log(router);
  const trendingTypes = [
    {
      name: "now",
    },
    {
      name: "music",
    },
    {
      name: "gaming",
    },
    {
      name: "movies",
    },
  ];
  const [trendingType, setTrendingType] = useState<string>("now");

  const { data, error, loading } = useTrending(
    `/trending?type=${trendingType}`
  );
  console.log(data?.data);
  return (
    <div>
      <Body>
        <div className="flex items-center gap-x-6 py-4">
          <Image
            src={TrendingLogo}
            width={100}
            height={100}
            className="rounded-full"
          />
          <p className="text-xl text-white">Trending</p>
        </div>
        <nav>
          <ul className="flex items-center gap-x-4 md:gap-x-8 xl:gap-x-16 text-gray-400 font-semibold">
            {trendingTypes.map(({ name }) => (
              <li
                key={v4()}
                className={`${
                  name === trendingType ? "border-b-2" : ""
                } text-sm md:text-base  font-semibold uppercase mb-4 cursor-pointer border-gray-400 `}
                onClick={() => setTrendingType(name)}
              >
                {name}
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex flex-wrap gap-y-4  py-4 px-2">
          {data?.data.map((trending: ITrending) => (
            <TrendingVideo trending={trending} key={v4()} />
          ))}
        </div>
      </Body>
    </div>
  );
};

export default TrendingPage;
