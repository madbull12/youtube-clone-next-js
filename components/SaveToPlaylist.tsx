import React,{ useRef } from 'react'
import { MdClose } from 'react-icons/md'
import useOutsideClick from '../hooks/useOutsideClick'

const SaveToPlaylist = () => {
    const ref= useRef(null);
    useOutsideClick(ref,()=>{

    })
  return (
    <div ref={ref} className='px-4 py-2 bg-zinc-800  text-white z-[999] relative w-44'>
        <header className='flex items-center justify-between'>
            <p>Save to...</p>
            <MdClose />
        </header>
    </div>
  )
}

export default SaveToPlaylist