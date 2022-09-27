import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Body from '../../components/Body'

const ChannelPage = () => {
    const router = useRouter();
    const { channelId } = router.query
    // useEffect(()=>{
    //     router.replace("/")
    // },[]);

    
  return (
    <Body>
        {/* <Image
            
        
        /> */}
    </Body>
  )
}

export default ChannelPage