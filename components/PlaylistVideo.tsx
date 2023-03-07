import Image from 'next/legacy/image'
import Link from 'next/link'
import React from 'react'
import { IPlaylistVideo } from '../interface'
import NoImage from '../public/no-image.png'

interface IProps {
    playlist:IPlaylistVideo
}
const PlaylistVideo = ({ playlist }:IProps ) => {
    console.log(playlist?.playlist)
  return (
    <div >
        <div className="relative flex items-center gap-x-4">
            {playlist.playlist.thumbnails !== null ? (
                <Image
                    src={playlist?.playlist?.thumbnails[3].url ?? NoImage}
                    height={playlist?.playlist?.thumbnails[3].height}
                    width={playlist?.playlist?.thumbnails[3].width}
                />
            ):(
            <Image
                src={NoImage}
                height={150}
                width={200}
            />
            )}
            <div>
                <h1 className='text-white text-lg'>{playlist.playlist.title}</h1>
                <Link href={`/channel/${playlist.playlist.author.channelId}/feature`}>
                    <p className="text-sm cursor-pointer text-gray-400">{playlist.playlist.author.title}</p>

                </Link>

            </div>
                
        </div>
    </div>
  )
}

export default PlaylistVideo