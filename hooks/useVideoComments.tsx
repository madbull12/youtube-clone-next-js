import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { trpc } from "../utils/trpc";

export default function useVideoComments(videoId: string) {
  const { data: comments } = trpc.comment.getVideoComments.useQuery({
    videoId,
    
  },{
    refetchOnMount:true
  });

  const utils = trpc.useContext();
  const { mutateAsync: addComment } = trpc.comment.createComment.useMutation({
    // onMutate: () => {
    //   utils.comment.getVideoComments.cancel();
    //   const optimisticUpdate = utils.comment.getVideoComments.getData({ videoId });
    //   if(optimisticUpdate) {
    //     utils.comment.getVideoComments.setData(optimisticUpdate);
    //   }
    // },
    onSettled: () => {
      utils.comment.getVideoComments.invalidate({ videoId });
    },
  });

  const handleAddComment = async (text: string) => {
    await toast.promise(addComment({ videoId, text }), {
      loading: "Posting comment",
      success: "Comment successfully posted",
      error: (err) => `Oops... something went wrong ${err}`,
    });
  };

  // const fetchVideoComments = async () => {
  //   const res = await axios.get(url);
  //   return res.data;
  // };

  // const {
  //   data,
  //   isLoading: loading,
  //   error,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["videoCommentsQuery"],
  //   queryFn: fetchVideoComments,
  // });

  // useEffect(() => {
  //   refetch();
  // }, [url]);

  return { comments, handleAddComment };
}
