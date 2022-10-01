import { GetServerSideProps } from 'next';
import { unstable_getServerSession } from 'next-auth';
import { getSession, useSession } from 'next-auth/react'
import Image from 'next/image';
import React from 'react'
import { AiFillClockCircle } from 'react-icons/ai';
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
        {videosList?.map((video:any)=>(
          <div>
            <Image src={video.thumbnail} width={176} height={88} />
          </div>
        ))}
      </div>
    </Body>
  )
}

export const getServerSideProps:GetServerSideProps = async(context) => {
  const session = await unstable_getServerSession(context.req, context.res, authOptions);
  const videosList = await prisma?.watchLater.findMany({
    where:{
      user:{
        email:session?.user?.email
      }
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