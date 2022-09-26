import React from 'react'
import { IChannel } from '../interface'

interface IProps {
    channel:IChannel;
}
const ChannelSnippet = ({ channel }:IProps) => {
  return (
    <div>ChannelSnippet</div>
  )
}

export default ChannelSnippet