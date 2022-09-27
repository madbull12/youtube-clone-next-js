import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Body from '../../components/Body'
import ChannelWrapper from '../../components/ChannelWrapper'
import useChannelDetails from '../../hooks/useChannelDetails'
import useChannelVideos from '../../hooks/useChannelVideos'

const ChannelPage = () => {
    const router = useRouter();
    const { channelId } = router.query
    // useEffect(()=>{
    //     router.replace("/")
    // },[]);
    const { data,loading,error } = useChannelDetails(`?id=${channelId}`);

    const { data:channelVideos } = useChannelVideos(`?id=${channelId}`);
    console.log(channelVideos)

  return (
    <Body>
        <ChannelWrapper channel={data}>
          
        </ChannelWrapper>
    </Body>
  )
}

export default ChannelPage