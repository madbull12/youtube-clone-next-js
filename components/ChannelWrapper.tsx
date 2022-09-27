import Image from 'next/image';
import React from 'react'
import { IChannelDetails } from '../interface';
import Body from './Body'

interface IProps {
    children:React.ReactNode;
    channel:IChannelDetails;
}
const ChannelWrapper = ( { children,channel }:IProps) => {
  return (
    <div>
        <Image 
            src={channel?.banner.desktop[0].url}
            height={channel?.banner.desktop[2].height}
            width={channel?.banner.desktop[2].width}
        />
        <div className='flex items-center justify-between'>
            
        </div>
        {children}
    </div>
  )
}

export default ChannelWrapper