import Image from 'next/image'
import React from 'react'

interface IProps {
    src:string;
}
const Avatar = ({ src }:IProps) => {
  return (
    <Image width={30} height={30} src={src ?? ""} className="rounded-full">

    </Image>
  )
}

export default Avatar