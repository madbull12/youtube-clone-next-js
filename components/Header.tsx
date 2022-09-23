import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import YoutubeLogo from '../public/youtube.png'

const Header = () => {
  return (
    <div className='p-4 bg-stone-800 fixed top-0 w-full right-0 '>
      <Link href="/">
        <Image className='cursor-pointer' src={YoutubeLogo} width={150}  height={100}/>

      </Link>
    </div>
  )
}

export default Header