import React, { useRef } from "react";
import { MdHomeFilled } from "react-icons/md";
import { AiFillFire } from "react-icons/ai";
import Link from "next/link";
import useOutsideClick from "../hooks/useOutsideClick";
import { useRecoilState } from "recoil";
import { menuNavState } from "../atom/menuNav";
import { FaUser } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import { FiLogIn, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [openMenuNav, setMenuNav] = useRecoilState(menuNavState);

  const { status } = useSession();
  // useOutsideClick(sidebarRef,()=>{
  //   setMenuNav(false)
  // })
  const handleSignIn = async () => {
    await signIn("google", {
      callbackUrl: "http://localhost:3000",
    });
  };
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "http://localhost:3000/",
    });
  };
  return (
    <aside
      ref={sidebarRef}
      className="fixed text-white pt-24 px-4 flex flex-col gap-y-8 left-0 top-0 bottom-0 bg-neutral-800 z-50 min-h-screen"
    >
      <Link as="/" href="/">
        <div className="items-center flex flex-col cursor-pointer">
          <MdHomeFilled className="text-xl" />
          <p className="text-xs">Home</p>
        </div>
      </Link>

      <Link as="/trending" href="/trending">
        <div className="items-center flex flex-col cursor-pointer">
          <AiFillFire className="text-xl" />
          <p className="text-xs">Trending</p>
        </div>
      </Link>
      {status === "authenticated" ? (
        <Link as="/profile" href="/profile">
          <div className="items-center flex flex-col cursor-pointer">
            <FaUser className="text-xl" />
            <p className="text-xs">Profile</p>
          </div>
        </Link>
      ) : null}

      {status === "authenticated" ? (
        <div
          className="items-center flex flex-col cursor-pointer"
          onClick={handleSignOut}
        >
          <FiLogOut className="text-xl" />
          <p className="text-xs">Logout</p>
        </div>
      ) : (
        <div
          className="items-center flex flex-col cursor-pointer"
          onClick={handleSignIn}
        >
          <FiLogIn className="text-xl" />
          <p className="text-xs">Login</p>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
