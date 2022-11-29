import { useEffect, useState } from "react";

import { youtubeDetails } from "../lib/axios";
import { useQuery } from "@tanstack/react-query";
export default function useFetchDetails(url: string) {
  const fetchDetails = async () => {
    const res = await youtubeDetails(url);
    return res.data;
  };

  const {
    data,
    isLoading: loading,
    error,
    refetch,
    isFetching
  } = useQuery({
    queryKey: ["detailsQuery"],
    queryFn: fetchDetails,
  });

  useEffect(() => {
    refetch();
  }, [url]);

  return { data, error, loading,isFetching };
}
