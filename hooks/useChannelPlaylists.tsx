import { useEffect, useState } from "react"
import { useQuery } from '@tanstack/react-query'
import  { youtubeChannelDetails, youtubeChannelPlaylists } from "../lib/axios"

export default function useChannelPlaylists(url:string){

    const fetchChannelPlaylists = async()=>{
        const res = await youtubeChannelPlaylists(url);
        return res.data;
    }

    const { data,isLoading:loading,error,refetch } =  useQuery({
        queryKey: ["channelPlaylistsQuery"],
        queryFn:fetchChannelPlaylists,
        
    });

    useEffect(()=>{
        refetch()
    },[url])

    return { data, error, loading }

}