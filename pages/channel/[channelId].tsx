import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Body from '../../components/Body'
import ChannelWrapper from '../../components/ChannelWrapper'
import useChannelDetails from '../../hooks/useChannelDetails'

const ChannelPage = () => {
    const router = useRouter();
    const { channelId } = router.query
    // useEffect(()=>{
    //     router.replace("/")
    // },[]);
    const { data,loading,error } = useChannelDetails(`?id=${channelId}`);



  return (
    <Body>
        <ChannelWrapper channel={data}>

        </ChannelWrapper>
    </Body>
  )
}

export default ChannelPage