import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useVideoComments(url: string) {
  const fetchVideoComments = async () => {
    const res = await axios.get(url);
    return res.data;
  };

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["videoCommentsQuery"],
    queryFn: fetchVideoComments,
  });

  useEffect(() => {
    refetch();
  }, [url]);

  return { data, error, loading };
}
