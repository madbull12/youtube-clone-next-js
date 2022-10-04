import React, { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { playlistDialogState } from "../atom/playlist";
import { useRecoilState } from "recoil";
import useOutsideClick from "../hooks/useOutsideClick";
import { BsPlusLg } from "react-icons/bs";

const SaveToPlaylist = () => {
  const ref = useRef(null);
  const [openPlaylist, setOpenPlaylist] = useRecoilState(playlistDialogState);
  useOutsideClick(ref, () => {
    setOpenPlaylist(false);
  });
  const [showPlaylistForm, setShowPlaylistForm] = useState<boolean>(false);
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
          <form className="flex flex-col space-y-2">
            <div className="flex flex-col ">
              <label htmlFor="name" className="">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter playlist name..."
                className="p-1 bg-transparent outline-none focus:border-b border-gray-400"
              />
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
