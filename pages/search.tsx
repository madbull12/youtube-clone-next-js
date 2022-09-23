import { useRouter } from 'next/router';
import React from 'react'
import useFetch from '../hooks/useFetch'

const SearchPage = () => {
    const router = useRouter();
    const { results } = router.query


    const {data,loading,error} = useFetch(`search?q=${results}&part=snippet,id`);
    console.log(data)

    if(error){
       console.log(error)
    }

  return (
    <div className='min-h-screen bg-neutral-900'>

    </div>
  )
}

export default SearchPage