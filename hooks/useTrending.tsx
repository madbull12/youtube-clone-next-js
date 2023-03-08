import { useEffect, useState } from "react"
import { useQuery } from '@tanstack/react-query'

import  { youtubeTrending } from "../lib/axios"

export default function useTrending(url:string){

    const fetchTrending = async()=>{
        const res = await youtubeTrending(url);
        return res.data;
    }

    const { data,isLoading:loading,error,refetch } =  useQuery({
        queryKey: ["trendingQuery"],
        queryFn:fetchTrending,
        refetchOnWindowFocus:false
    });

    useEffect(()=>{
        refetch()
    },[url])

    return { data, error, loading }


}