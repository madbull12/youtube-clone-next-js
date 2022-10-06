import Image from "next/image";
import React from "react";
import Body from "../components/Body";
import useTrending from "../hooks/useTrending";
import { ITrending } from "../interface";

interface IProps {
  trending: ITrending;
}
const TrendingVideo = ({ trending }: IProps) => {
  return (
    <div className="flex gap-x-2">
      <Image
        src={trending.thumbnail[1].url}
        width={trending.thumbnail[1].width}
        height={trending.thumbnail[1].height}
      />
    </div>
  );
};

const TrendingPage = () => {
  const { data, error, loading } = useTrending("/trending");
  console.log(data?.data);
  return (
    <div>
      <Body>
        {data?.data.map((trending: ITrending) => (
          <TrendingVideo trending={trending} />
        ))}
      </Body>
    </div>
  );
};

export default TrendingPage;
