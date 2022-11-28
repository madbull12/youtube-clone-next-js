import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'
import { v4 } from 'uuid';
import Body from '../../../components/Body'
import ChannelWrapper from '../../../components/ChannelWrapper';
import useChannelDetails from '../../../hooks/useChannelDetails';

const AboutPage  = () => {
    const router = useRouter();
    const { channelId } = router.query;
    const { data:channel,loading,error } = useChannelDetails(`?id=${channelId}`);

    console.log(channel)


  return (
    <Body>
        <ChannelWrapper>
        <div className='py-6 px-4 flex justify-between'>
                <div className='divide-y divide-zinc-600 w-2/3'>
                    <div className='pb-4'>
                        <p className='text-white text-lg'>Description</p>
                        <p className='text-white mt-4 text-sm'>
                            {channel?.description}
                        </p>
                    </div>
                    <div className='py-4'>
                        <p className='text-white text-lg'>Details</p>
                        <p className='text-gray-400 text-sm'>Location: {channel?.country}</p>
                    </div>
                    <div className='grid grid-cols-4 pt-4'>
                        {channel?.links.map((link:any)=>(
                                <a href={link.targetUrl} key={v4()} className="text-blue-500 text-sm">
                                    {link.title}
                                </a>
                        ))}
                     
                    </div>
                 

                </div>
                <div className='divide-y w-1/4 divide-zinc-600 text-white'>
                    <div className='py-2'>
                        Stats
                    </div>
                    <p className='py-2'>{channel?.joinedDateText}</p>
                    <p className='py-2'>{channel?.stats.views} views</p>

                </div>

            </div>

        </ChannelWrapper>
            
    </Body>
  )
}

export default AboutPage