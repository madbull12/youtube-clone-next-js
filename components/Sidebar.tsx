import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { AiFillFire } from "react-icons/ai";

const Sidebar = () => {
  return (
    <aside className="fixed text-white pt-24 px-4 flex flex-col gap-y-8 left-0 top-0 bottom-0 bg-neutral-800 z-50 min-h-screen">
      <div className="items-center flex flex-col">
        <MdHomeFilled className="text-xl" />
        <p className="text-xs">Home</p>
      </div>
      <div className="items-center flex flex-col">
        <AiFillFire className="text-xl" />
        <p className="text-xs">Trending</p>
      </div>
    </aside>
  );
};

export default Sidebar;
