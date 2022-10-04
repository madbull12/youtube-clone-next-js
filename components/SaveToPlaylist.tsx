import React, { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { playlistDialogState } from "../atom/playlist";
import { useRecoilState, useRecoilValue } from "recoil";
import useOutsideClick from "../hooks/useOutsideClick";
import { BsPlusLg } from "react-icons/bs";
import toast from "react-hot-toast";
import { videoValue } from "../atom/video";

const SaveToPlaylist = () => {
  const ref = useRef(null);
  const [openPlaylist, setOpenPlaylist] = useRecoilState(playlistDialogState);
  const videoStateValue = useRecoilValue(videoValue);

  useOutsideClick(ref, () => {
    setOpenPlaylist(false);
  });
  const [showPlaylistForm, setShowPlaylistForm] = useState<boolean>(false);
  const [playlistName,setPlaylistName] = useState<string>("");
  const [privacy, setPrivacy] = useState<string>("");



  console.log(privacy);

  const createPlaylistAndSaveVideo = async() => {
    const data = {
      title:playlistName,
      privacy,
      ...videoStateValue

    }
    await toast.promise(
      fetch("/api/playlist",{
        method:"POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),{
        loading:"Creating playlist",
        success:"yeahh",
        error:"crap something went wrong!"
      }
    )
  }
  return (
    <div
      ref={ref}
      className=" py-2 bg-zinc-800 divide-y  divide-zinc-600 text-white z-[999] relative min-w-fit"
    >
      <header className="flex items-center justify-between px-4 py-2">
        <p>Save to...</p>
        <MdClose className="text-lg" onClick={() => setOpenPlaylist(false)} />
      </header>
      <div className="px-4 py-2">
        {showPlaylistForm ? (
          <form className="flex flex-col space-y-2" onSubmit={createPlaylistAndSaveVideo}>
            <div className="flex flex-col ">
              <label htmlFor="name" className="">
                Name
              </label>
              <input
                onChange={(e)=>setPlaylistName(e.target.value)}
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
              <button type="submit" className="bg-transparent px-4 py-2 text-blue-500 font-semibold self-start">CREATE</button>
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
