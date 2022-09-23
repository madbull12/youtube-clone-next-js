import { useRouter } from 'next/router';
import React from 'react'
import Body from '../components/Body';
import SearchSnippet from '../components/SearchSnippet';
import useFetch from '../hooks/useFetch'
import { IVideo } from '../interface';

const SearchPage = () => {
    const router = useRouter();
    const { results } = router.query


    const {data,loading,error} = useFetch(`search?q=${results}&part=snippet,id&maxResults=50`);
    console.log(data)

    if(error){
       console.log(error)
    }

  return (
    <Body>
        <div className='flex flex-col space-y-4'>
            {data?.items.map((item:IVideo)=>(
                <SearchSnippet video={item} />
            ))}
        </div>
    </Body>
  )
}

export default SearchPage