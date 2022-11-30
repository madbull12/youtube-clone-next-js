import { useQuery } from "@tanstack/react-query";
import axios from "axios"
import { useEffect, useState } from "react"


export default function useUserPlaylists(url:string){

    const fetchPlaylists = async()=>{
        const res = await axios.get(url);
        return res.data;
    }

    const { data,isLoading:loading,error,refetch } =  useQuery({
        queryKey: ["userPlaylists"],
        queryFn:fetchPlaylists,
        
    });

    useEffect(()=>{
        refetch()
    },[url])

    return { data, error, loading }

}