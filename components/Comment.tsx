import Image from 'next/image'
import React from 'react'
import ReactTimeAgo from 'react-time-ago'
import toHTML from '../helper/toHTML'
import { IComment } from '../interface'
import Avatar from './Avatar'

interface IProps {
    comment:IComment
}
const Comment = ({ comment }:IProps ) => {
  return (
    <div className='gap-x-4 items-center flex'>
        <Avatar src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl}  />
        <div className='space-y-2'>
            <div className='flex gap-x-2 items-center '>
                <p className='text-white font-semibold'>{comment.snippet.topLevelComment.snippet.authorDisplayName}</p>
                <ReactTimeAgo className='text-gray-400 text-sm' date={comment.snippet.topLevelComment.snippet.publishedAt} />
            </div>
            <p className='text-white'>
                {comment.snippet.topLevelComment.snippet.textDisplay}
            </p>
        </div>
    </div>
  )
}

export default Comment