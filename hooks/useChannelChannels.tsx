import { useEffect, useState } from "react"
import { useQuery } from '@tanstack/react-query'
import  { youtubeChannelChannels } from "../lib/axios"

export default function useChannelChannels(url:string){
    const fetchChannelChannels = async()=>{
        const res = await youtubeChannelChannels(url);
        return res.data;
    }

    const { data,isLoading:loading,error,refetch } =  useQuery({
        queryKey: ["channelChannelsQuery"],
        queryFn:fetchChannelChannels,
        
    });

    useEffect(()=>{
        refetch()
    },[url])

    return { data, error, loading }
}