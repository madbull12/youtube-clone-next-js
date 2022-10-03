import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { getSession, useSession } from 'next-auth/react'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { AiFillClockCircle } from 'react-icons/ai';
import ReactTimeAgo from 'react-time-ago';
import Avatar from '../components/Avatar';
import Body from '../components/Body'
import { IVideoV3 } from '../interface';
import { authOptions } from './api/auth/[...nextauth]';

const ProfilePage = ({ videosList }:{ videosList:any }) => {
  const { data:session } = useSession();
  console.log(videosList)
  return (
    <Body>
      <div className='flex items-center gap-x-4'>
        <Avatar src={session?.user?.image ?? ""} width={80} height={80} />
        <p className='text-xl text-white'>{session?.user?.name}</p>
      </div>
      <div>
        <div className='flex  mt-8 gap-x-4 items-center'> 
          <AiFillClockCircle className='text-white' />
          <p className=' text-xl text-white'>Watch later</p>

        </div>
        <div className='grid grid-cols-5 gap-4 mt-4'>
          {videosList.length === 0 ? (
            <p className='text-white text-lg'>No videos saved</p>
          ):(
            <>
              {videosList?.map((video:any)=>(
                <Link href={`/watch?v=${video.videoId}`}>
                  <div className='flex flex-col cursor-pointer space-y-2'>
                    <Image src={video.thumbnail} width={320} height={180} />
                    <p className='text-white'>{video.title}</p>
                    <div className='flex justify-between items-center'>
                      <p className="text-gray-400 text-sm">{video.authorTitle}</p>
                      <p></p>
                    </div>
                  </div>
                </Link>
            ))}
            </>
            
          )}
         
        </div>
       
      </div>
    </Body>
  )
}

export const getServerSideProps:GetServerSideProps = async(context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  const videosList = await prisma?.watchLater.findMany({
    where:{
      user:{
        email:session?.user?.email,
        
      },
      
    },
    orderBy:{
      createdAt:"desc"
    }
  });

  console.log(videosList)

  return {
    props:{
      videosList:JSON.parse(JSON.stringify(videosList))
    }
  }
}



export default ProfilePage