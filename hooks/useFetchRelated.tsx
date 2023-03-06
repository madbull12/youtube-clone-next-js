import { useEffect, useState } from "react"
import { useQuery } from '@tanstack/react-query'
import  {  youtubeRelated } from "../lib/axios"

export default function useFetchRelated(url:string){

    const fetchRelated = async()=>{
        const res = await youtubeRelated(url);
        return res.data;
    }

    const { data,isLoading:loading,error,refetch } =  useQuery({
        queryKey: ["relatedQuery"],
        queryFn:fetchRelated,
        refetchOnWindowFocus:false
    }
    );

    useEffect(()=>{
        refetch()
    },[url])

    return { data, error, loading }

}