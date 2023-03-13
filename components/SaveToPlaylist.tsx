import React, { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { playlistDialogState } from "../atom/playlist";
import { useRecoilState, useRecoilValue } from "recoil";
import useOutsideClick from "../hooks/useOutsideClick";
import { BsGlobe, BsLockFill, BsPlusLg } from "react-icons/bs";
import toast from "react-hot-toast";
import { videoValue } from "../atom/video";
import { IPlaylist } from "../interface";
import { v4 } from "uuid";
import useUserPlaylists from "../hooks/useUserPlaylists";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { trpc } from "../utils/trpc";
import useSavePlaylist from "../hooks/useSavePlaylist";
interface IProps {
  userPlaylists: IPlaylist[];
}
const SaveToPlaylist = () => {
  const ref = useRef(null);
  const [openPlaylist, setOpenPlaylist] = useRecoilState(playlistDialogState);
  const videoStateValue = useRecoilValue(videoValue);
  const { data: userPlaylists } = trpc.playlist.userPlaylists.useQuery();

  console.log(userPlaylists);

  useOutsideClick(ref, () => {
    setOpenPlaylist(false);
  });

  const [showPlaylistForm, setShowPlaylistForm] = useState<boolean>(false);
  const [playlistName, setPlaylistName] = useState<string>("");
  const [privacy, setPrivacy] = useState<string>("public");

  const { handleSaveToPlaylist, handleCreateandSavetoPlaylist } =
    useSavePlaylist();

  console.log(privacy);
  // const { mutateAsync:createPlaylist } = useMutation({
  //   mutationFn: (data:any) => {
  //     return axios.post("/api/playlist", data);
  //   },
  //   // onSuccess: () => {
  //   //   queryClient.invalidateQueries({ queryKey: ["videoComments"] });
  //   // },
  // });

  const createPlaylistAndSaveVideo = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    handleCreateandSavetoPlaylist(playlistName, privacy);

    setOpenPlaylist(false);
  };
  return (
    <div
      ref={ref}
      className=" py-2 bg-zinc-800 divide-y  divide-zinc-600 text-white z-[99999] relative min-w-fit"
    >
      <header className="flex items-center justify-between px-4 py-2">
        <p>Save to...</p>
        <MdClose className="text-lg" onClick={() => setOpenPlaylist(false)} />
      </header>
      <div className="flex flex-col ">
        {userPlaylists?.map((playlist) => (
          <div
            key={v4()}
            onClick={() => handleSaveToPlaylist(playlist.id)}
            className="p-3 cursor-pointer hover:bg-zinc-600  flex items-center gap-x-4 justify-between"
          >
            <p>{playlist.title}</p>
            {playlist.privacy === "private" ? <BsLockFill /> : <BsGlobe />}
          </div>
        ))}
      </div>
      <div className="px-4 py-2">
        {showPlaylistForm ? (
          <form
            className="flex flex-col space-y-2"
            onSubmit={createPlaylistAndSaveVideo}
          >
            <div className="flex flex-col ">
              <label htmlFor="name" className="">
                Name
              </label>
              <input
                onChange={(e) => setPlaylistName(e.target.value)}
                name="name"
                type="text"
                placeholder="Enter playlist name..."
                className="p-1 bg-transparent outline-none focus:border-b border-gray-400"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="privacy">Privacy</label>
              <select
                name="privacy"
                className="bg-transparent outline-none"
                value={privacy}
                onChange={(e) => setPrivacy(e.target.value)}
              >
                <option value="public" className=" bg-zinc-700">
                  Public
                </option>
                <option value="private" className=" bg-zinc-700">
                  Private
                </option>
              </select>
              <button
                type="submit"
                className="bg-transparent px-4 py-2 text-blue-500 font-semibold self-start"
              >
                CREATE
              </button>
            </div>
          </form>
        ) : (
          <button
            className="flex items-center gap-x-4 "
            onClick={(e) => {
              e.stopPropagation();
              setShowPlaylistForm(true);
            }}
          >
            <BsPlusLg />
            <p>Create new playlist</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default SaveToPlaylist;
