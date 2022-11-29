import { useEffect, useState } from "react"
import { useQuery } from '@tanstack/react-query'
import  { youtubeChannelVideos } from "../lib/axios"

export default function useChannelVideos(url:string){

    const fetchChannelVideos = async()=>{
        const res = await youtubeChannelVideos(url);
        return res.data;
    }

    const { data,isLoading:loading,error,refetch } =  useQuery({
        queryKey: ["channelVideosQuery"],
        queryFn:fetchChannelVideos,
        
    });

    useEffect(()=>{
        refetch()
    },[url])

    return { data, error, loading }
}