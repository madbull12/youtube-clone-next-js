import { useEffect, useState } from "react"
import { useQuery } from '@tanstack/react-query'
import  { youtubeSearch } from "../lib/axios"

export default function useSearch(url:string){
    const fetchSearch = async()=>{
        const res = await youtubeSearch(url);
        return res.data;
    }

    const { data,isLoading:loading,error,refetch } =  useQuery({
        queryKey: ["searchQuery"],
        queryFn:fetchSearch,
        refetchOnWindowFocus:false
    });

    useEffect(()=>{
        refetch()
    },[url])

    return { data, error, loading }

}