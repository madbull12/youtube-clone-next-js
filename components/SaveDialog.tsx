import React from 'react'
import { AiFillClockCircle } from 'react-icons/ai'
import { MdPlaylistAdd } from 'react-icons/md'
import saveToWatchLater from '../helper/saveToWatchLater'
import { IVideoV3 } from '../interface'

interface IProps {
    saveToWatchLater:()=>void
}
const SaveDialog = ({ saveToWatchLater }:IProps) => {
  return (
    <div className="absolute top-full -right-8 py-2 z-50 bg-zinc-800 text-white w-72 space-y-4 rounded-lg">
    <button
      className="flex items-center gap-x-3 py-1 hover:bg-zinc-600 px-4 w-full"
      onClick={(e) =>{
        e.stopPropagation()
        saveToWatchLater()
        }}
    >
      <AiFillClockCircle className="text-xl" />
      Save to watch later
    </button>
    <button className="flex items-center gap-x-3 py-1 hover:bg-zinc-500 px-4 w-full">
      <MdPlaylistAdd className="text-xl" />
      Save to playlist
    </button>
  </div>
  )
}

export default SaveDialog