import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React,{ useState } from "react";
import Body from "../components/Body";
import SuggestedSnippet from "../components/SuggestedSnippet";
import nFormatter from "../helper/convertion";
import truncate from "../helper/truncate";
import useFetch from "../hooks/useSearch";
import { IComment, ISnippet, IVideo, IVideoDetails } from "../interface";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import Comment from "../components/Comment";
import { useSession } from "next-auth/react";
import Avatar from "../components/Avatar";
import { GetServerSideProps } from "next";
import useFetchDetails from "../hooks/useFetchDetails";
import { v4 as uuidv4 } from 'uuid'
import useFetchRelated from "../hooks/useFetchRelated";

const VideoPage = ({ comments }:{ comments:IComment[] }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { v } = router.query;
  const [textComment,setTextComment] = useState<string>("");
  const { data,loading,error } = useFetchDetails(`?id=${v}`);




  const refreshData = () => {
    router.replace(router.asPath);
  }

  const createComment = async(e:React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { text:textComment,videoId:data?.items[0].id };
      setTextComment("")

      await fetch('/api/comment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(error);
    } finally {
      refreshData();
     
    }
  }



  const { data:relatedContents } = useFetchRelated(`?id=${v}`);
  console.log(relatedContents)



  // const { data: comments } = useFetch(
  //   `commentThreads?videoId=${data?.items[0]?.id}&maxResults=101&part=snippet`
  // );

  // const { data:channelData } = useFetch(`channels?part=snippet,statistics&id=${data?.items[0]?.snippet?.channelId}`)

  // console.log(suggestedVideos);
  return (
    <Body>
      <div className="flex gap-x-6">
        <div className="w-[60%] space-y-2">
          <iframe
            height={400}
            className="w-full "
            src={`https://www.youtube.com/embed/${data?.videoId}`}
          ></iframe>
          <p className="text-blue-500 text-sm">{data?.superTitle.items[0]}</p>
          <h1 className="text-xl text-white">
            {data?.title}
          </h1>
          <div className="justify-between flex items-center">
            <div className="gap-x-3 flex items-center ">
              <p className="text-gray-400 ">
                {Number(data?.stats.views).toLocaleString()}{" "}
                views
              </p>
              <p className="text-gray-400 text-sm">
                {moment(data?.publishedDate).format("ll")}
              </p>
            </div>
            <div className="flex gap-x-4 items-center">
              <div className="flex gap-x-2 items-center">
                <FiThumbsUp className="text-white" />
                <p className="text-white font-semibold">
                  {nFormatter(data?.stats.likes)}
                </p>
              </div>
              <div className="flex gap-x-2 items-center">
                <FiThumbsDown className="text-white" />
                <p className="text-white font-semibold">DISLIKE</p>
              </div>
            </div>
          </div>
          <Link href="/">
            <p className="text-white cursor-pointer font-semibold">
              {data?.author.title}
            </p>
          </Link>
          <p className="text-white ">
            {data?.description}
          </p>

          <div>
            <h1 className="text-lg text-white mt-16">Comments</h1>
            <div className="flex items-center gap-x-2 mt-4">
              {status === "authenticated" && (
                <Avatar src={session?.user?.image ?? ""} />
              )}
              <form 
                className="w-full"
                onSubmit={createComment}
              >
                <input
                  className="bg-transparent text-sm p-2 outline-none text-white border-b border-gray-600 focus:border-blue-500 w-full"
                  type="text"
                  disabled={status === "unauthenticated"}
                  placeholder={`${
                    status === "authenticated"
                      ? "Add a comment"
                      : "Please login first before comment"
                  }`}
                  onChange={(e)=>setTextComment(e.target.value)}
                />
              </form>
           
            </div>
            <div className="space-y-6 mt-6">
              {comments?.map((comment:IComment)=>(
                <Comment comment={comment} key={uuidv4()} />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2">
                {
                  relatedContents?.contents
                    .filter((item:IVideo)=>item.type==="video")
                    .map((item:IVideo)=>(
                      <SuggestedSnippet video={item} />
                    ))
                }
        </div>
      </div>
    </Body>
  );
};

export const getServerSideProps:GetServerSideProps = async({ query }) => {
  const comments = await prisma?.comment.findMany({
    where:{
      videoId:query.v as string
    },
    include:{
      author:{
        select:{
          name:true,
          email:true,
          image:true
        }
      }
    }
  })

  return{
    props:{
      comments:JSON.parse(JSON.stringify(comments))
    }
  }
}

export default VideoPage;
