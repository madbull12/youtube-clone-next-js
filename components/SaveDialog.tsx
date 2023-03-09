import React, { useRef, useEffect, useState } from "react";
import { AiFillClockCircle } from "react-icons/ai";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdPlaylistAdd } from "react-icons/md";
import { useRecoilState } from "recoil";
import { playlistDialogState } from "../atom/playlist";
import { videoState } from "../atom/video";
import useOutsideClick from "../hooks/useOutsideClick";
import useSavePlaylist from "../hooks/useSavePlaylist";
import useSaveWatchLater from "../hooks/useSaveWatchLater";

interface IProps {
  videoId: string;
  thumbnail: string;
  title: string;
  authorTitle: string;
  publishedTimeText: string;
}
const SaveDialog = ({
  videoId,
  thumbnail,
  title,
  authorTitle,
  publishedTimeText,
}: IProps) => {
  const [openDialog, setOpenDialog] = useRecoilState(playlistDialogState);
  const [saveVideoState,setVideoState] = useRecoilState(videoState);
  const ref = useRef(null);

  const { handleSaveToWatchLater } = useSaveWatchLater();

  const saveVideoObj={
    videoId,
    thumbnail,
    title,
    authorTitle,
    publishedTimeText,
  }

  return (
    <div className="relative" ref={ref}>
      <div className="absolute  top-full -right-8 py-2 z-50 bg-zinc-800 text-white w-72 space-y-4 rounded-lg">
        <button
          className="flex items-center gap-x-3 py-1 hover:bg-zinc-600 px-4 w-full"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            handleSaveToWatchLater();
          }}
        >
          <AiFillClockCircle className="text-xl" />
          Save to watch later
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            window.scrollTo(0, 0);
            setOpenDialog(true);
            setVideoState(saveVideoObj)
          }}
          className="flex items-center gap-x-3 py-1 hover:bg-zinc-500 px-4 w-full"
        >
          <MdPlaylistAdd className="text-xl" />
          Save to playlist
        </button>
      </div>
    </div>
  );
};

export default SaveDialog;
