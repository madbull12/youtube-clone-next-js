import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Body from '../../../components/Body'
import ChannelWrapper from '../../../components/ChannelWrapper'
import VideoSnippet from '../../../components/VideoSnippet'
import useChannelDetails from '../../../hooks/useChannelDetails'
import useChannelVideos from '../../../hooks/useChannelVideos'
import { IVideo } from '../../../interface'
import { v4 as uuidv4 } from 'uuid'

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
          <div className='mt-4 grid gap-x-2 gap-y-4 grid-cols-5'>
            {channelVideos?.contents.slice(0,1).map((video:IVideo)=>(
                <div className="col-span-5 row-span-3" key={uuidv4()}>
                    <VideoSnippet video={video} column={false} />

                </div>
            ))}
            {channelVideos?.contents.slice(1,channelVideos?.contents.length).map((video:IVideo)=>(
              <VideoSnippet video={video} column={true} key={uuidv4()} />
            ))}
          </div>
        
        </ChannelWrapper>
    </Body>
  )
}

export default ChannelPage