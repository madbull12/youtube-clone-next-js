import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import Body from "../components/Body";
import VideoSnippet from "../components/VideoSnippet";
import nFormatter from "../helper/convertion";
import truncate from "../helper/truncate";
import useFetch from "../hooks/useSearch";
import {
  IComment,
  IPlaylist,
  ISnippet,
  IVideo,
  IVideoDetails,
  PlaylistVideo,
} from "../interface";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import Comment from "../components/Comment";
import { useSession } from "next-auth/react";
import Avatar from "../components/Avatar";
import { GetServerSideProps } from "next";
import useFetchDetails from "../hooks/useFetchDetails";
import { v4 as uuidv4, v4 } from "uuid";
import useFetchRelated from "../hooks/useFetchRelated";
import { MdPlaylistAdd } from "react-icons/md";
import { useRecoilState, useRecoilValue } from "recoil";
import { isPlaylistDialogOpen, playlistDialogState } from "../atom/playlist";
import Backdrop from "../components/Backdrop";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import SaveToPlaylist from "../components/SaveToPlaylist";
import toast from "react-hot-toast";
import SaveDialog from "../components/SaveDialog";
import saveToWatchLater from "../helper/saveToWatchLater";
import { videoState } from "../atom/video";
import useOutsideClick from "../hooks/useOutsideClick";

const VideoPage = ({
  comments,
  userPlaylists,
}: {
  comments: IComment[];
  userPlaylists: IPlaylist[];
}) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { v } = router.query;
  const [textComment, setTextComment] = useState<string>("");
  const { data, loading, error } = useFetchDetails(`?id=${v}`);
  const [openDialog, setOpenDialog] = useRecoilState(playlistDialogState);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [_videoState, setVideoState] = useRecoilState(videoState);

  const isPlaylistOpen = useRecoilValue(isPlaylistDialogOpen);

  const saveDialogRef = useRef<HTMLDivElement>(null);

  useOutsideClick(saveDialogRef, () => {
    setDialogOpen(false);
  });

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    if (!isPlaylistOpen) {
      document.body.style.overflowY = "visible";
    }
  }, [isPlaylistOpen]);

  const refreshData = () => {
    router.replace(router.asPath, undefined, { scroll: false });
  };

  const createComment = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const body = { text: textComment, videoId: data?.videoId };
    setTextComment("");

    await toast.promise(
      fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }),
      {
        loading: "Posting comment",
        success: "Comment created",
        error: "Oops... something went wrong!",
      }
    );

    await refreshData();
  };

  const { data: relatedContents } = useFetchRelated(`?id=${v}`);
  console.log(data);

  return (
    <Body>
      {openDialog && (
        <Backdrop>
          <SaveToPlaylist userPlaylists={userPlaylists} />
        </Backdrop>
      )}
      <div className="flex gap-x-6 gap-y-6 flex-col lg:flex-row">
        <div className="flex-[0.6] space-y-4">
          <iframe
            height={400}
            className="w-full "
            src={`https://www.youtube.com/embed/${data?.videoId}`}
          ></iframe>
          <p className="text-blue-500 text-sm">
            {data?.superTitle.items.map((item: string) => item + " ")}
          </p>

          <h1 className="lg:text-xl text-base text-white">{data?.title}</h1>
          <div className="justify-between flex items-start text-sm md:text-base md:flex-row md:items-center flex-col ">
            <div className="gap-x-3 flex items-center ">
              <p className="text-gray-400 ">
                {Number(data?.stats.views).toLocaleString()} views
              </p>
              <p className="text-gray-400 text-sm">
                {moment(data?.publishedDate).format("ll")}
              </p>
            </div>
            <div className="flex gap-x-4 items-center">
              <div className="flex gap-x-2 items-center cursor-pointer">
                <FiThumbsUp className="text-white" />
                <p className="text-white font-semibold">
                  {nFormatter(data?.stats.likes)}
                </p>
              </div>
              <div className="flex gap-x-2 items-center cursor-pointer">
                <FiThumbsDown className="text-white" />
                <p className="text-white font-semibold">DISLIKE</p>
              </div>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  status === "authenticated"
                    ? setDialogOpen(true)
                    : toast.error("Please login first");
                }}
                className="flex gap-x-2 items-center cursor-pointer relative"
              >
                <MdPlaylistAdd className="text-white text-lg" />
                <p className="text-white font-semibold">SAVE</p>
                {dialogOpen ? (
                  <div ref={saveDialogRef}>
                    <SaveDialog
                      saveToPlaylist={() => {
                        const video: PlaylistVideo = {
                          videoId: data?.videoId,
                          thumbnail: data?.thumbnails[0].url,
                          title: data?.title,
                          authorTitle: data?.author.title,
                          publishedTimeText: data?.publishedDate,
                        };

                        {
                          status === "authenticated"
                            ? setVideoState(video)
                            : toast.error(
                                "Please login first to perform the action!"
                              );
                        }
                      }}
                      saveToWatchLater={() => {
                        {
                          status === "authenticated"
                            ? saveToWatchLater(
                                data?.thumbnails[0].url,
                                data?.title,
                                data?.author.title,
                                data?.publishedDate,
                                data?.videoId
                              )
                            : toast.error(
                                "Please login first to perform the action!"
                              );
                        }
                      }}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <Link href={`/channel/${data?.author.channelId}/feature`}>
            <div className="flex items-center gap-x-4 ">
              <Avatar
                src={data?.author.avatar[0].url}
                width={data?.author.avatar[0].width}
                height={data?.author.avatar[0].height}
              />
              <p className="text-white  cursor-pointer text-sm md:text-base font-semibold">
                {data?.author.title}
              </p>
            </div>
          </Link>
          <p className="text-white text-sm md:text-base ">{data?.description}</p>
          <div className="hidden lg:block">
            <h1 className="text-lg text-white mt-16">Comments</h1>
            <div className="flex items-center gap-x-2 mt-4">
              {status === "authenticated" && (
                <Avatar
                  src={session?.user?.image ?? ""}
                  width={30}
                  height={30}
                />
              )}
              <form className="w-full" onSubmit={createComment}>
                <input
                  className="bg-transparent text-sm p-2 outline-none text-white border-b border-gray-600 focus:border-blue-500 w-full"
                  type="text"
                  disabled={status === "unauthenticated"}
                  placeholder={`${
                    status === "authenticated"
                      ? "Add a comment"
                      : "Please login first before comment"
                  }`}
                  onChange={(e) => setTextComment(e.target.value)}
                />
              </form>
            </div>
            <div className="space-y-6 mt-6">
              {comments?.map((comment: IComment) => (
                <Comment comment={comment} key={uuidv4()} />
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-2 flex-[0.4]">
          {relatedContents?.contents
            .filter((item: IVideo) => item.type === "video")
            .map((item: IVideo) => (
              <VideoSnippet column={false} key={v4()} video={item} />
            ))}
        </div>
      </div>
      <div className="lg:hidden">
        <h1 className="text-lg text-white mt-16">Comments</h1>
        <div className="flex items-center gap-x-2 mt-4">
          {status === "authenticated" && (
            <Avatar src={session?.user?.image ?? ""} width={30} height={30} />
          )}
          <form className="w-full" onSubmit={createComment}>
            <input
              className="bg-transparent text-sm p-2 outline-none text-white border-b border-gray-600 focus:border-blue-500 w-full"
              type="text"
              disabled={status === "unauthenticated"}
              placeholder={`${
                status === "authenticated"
                  ? "Add a comment"
                  : "Please login first before comment"
              }`}
              onChange={(e) => setTextComment(e.target.value)}
            />
          </form>
        </div>
        <div className="space-y-6 mt-6">
          {comments?.map((comment: IComment) => (
            <Comment comment={comment} key={uuidv4()} />
          ))}
        </div>
      </div>
    </Body>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const comments = await prisma?.comment.findMany({
    where: {
      videoId: context.query.v as string,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  const userPlaylists = await prisma?.playlist.findMany({
    where: {
      user: {
        email: session?.user?.email,
      },
    },
  });

  return {
    props: {
      comments: JSON.parse(JSON.stringify(comments)),
      userPlaylists: JSON.parse(JSON.stringify(userPlaylists)),
    },
  };
};

export default VideoPage;
