import React,{ useRef } from "react";
import { MdHomeFilled } from "react-icons/md";
import { AiFillFire } from "react-icons/ai";
import Link from "next/link";
import useOutsideClick from "../hooks/useOutsideClick";
import { useRecoilState } from "recoil";
import { menuNavState } from "../atom/menuNav";

const Sidebar = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [openMenuNav,setMenuNav] = useRecoilState(menuNavState);


  // useOutsideClick(sidebarRef,()=>{
  //   setMenuNav(false)
  // })
  return (
    <aside ref={sidebarRef} className="fixed text-white pt-24 px-4 flex flex-col gap-y-8 left-0 top-0 bottom-0 bg-neutral-800 z-50 min-h-screen">
      <Link as="/" href="/">
      <div className="items-center flex flex-col cursor-pointer">
        <MdHomeFilled className="text-xl" />
        <p className="text-xs">Home</p>
      </div>
      </Link>
   
      <div className="items-center flex flex-col cursor-pointer">
        <AiFillFire className="text-xl" />
        <p className="text-xs">Trending</p>
      </div>
    </aside>
  );
};

export default Sidebar;
