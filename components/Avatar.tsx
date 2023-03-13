import Image from "next/image";
import React from "react";

interface IProps {
  src: string;
  width: number;
  height: number;
}
const Avatar = ({ src, width, height }: IProps) => {
  return (
    <div>
      <Image
        width={width ?? 30}
        height={height ?? 30}
        src={src ?? ""}
        alt="avatar"
        className="rounded-full cursor-pointer"
      />
    </div>

  );
};

export default Avatar;
