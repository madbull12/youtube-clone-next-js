import { useRouter } from 'next/router'
import React from 'react'
import Body from '../../../components/Body'
import ChannelWrapper from '../../../components/ChannelWrapper'
import useChannelPlaylists from '../../../hooks/useChannelPlaylists'

const PlaylistPage = () => {
    const router = useRouter()
    const { channelId } = router.query;

    const { data,loading,error } = useChannelPlaylists(`?id=${channelId}`);

    console.log(data)

  return (
    <Body>
        <ChannelWrapper>


        </ChannelWrapper>
    </Body>
  )
}

export default PlaylistPage