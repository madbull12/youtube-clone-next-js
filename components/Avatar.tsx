import Image from 'next/image'
import React from 'react'

interface IProps {
    src:string;
}
const Avatar = ({ src }:IProps) => {
  return (
    <Image width={40} height={40} src={src ?? ""} className="rounded-full">

    </Image>
  )
}

export default Avatar