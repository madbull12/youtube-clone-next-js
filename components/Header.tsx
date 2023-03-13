import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import YoutubeLogo from "../public/youtube.png";
import Button from "./Button";
import Search from "./Search";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "./Avatar";
import useMediaQuery from "../hooks/useMediaQuery";
import { GoSearch } from "react-icons/go";
import { BsArrowLeft, BsMenuApp } from "react-icons/bs";
import { AiOutlineMenu } from "react-icons/ai";
import { useRecoilState } from "recoil";
import { menuNavState } from "../atom/menuNav";

const Header = () => {
  const { data, status } = useSession();
  const [openMobileSearch, setOpenMobileSearch] = useState<boolean>(false);
  const [openMenuNav,setMenuNav] = useRecoilState(menuNavState);

  const matches = useMediaQuery("(min-width: 500px)");
  useEffect(() => {
    if (matches) {
      setOpenMobileSearch(false);
    } else {
      setOpenMobileSearch(true);
    }
  }, [matches]);

  console.log(matches);

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
    <div className="px-4 py-2 bg-neutral-800 z-50 fixed top-0 w-full right-0 flex justify-between items-center">
      <div className="flex gap-x-2 items-center">
        <AiOutlineMenu className="text-white   text-lg cursor-pointer" onClick={()=>setMenuNav(!openMenuNav)}  />
        <Link href="/">
          <Image
          alt="logo"
            className="cursor-pointer mr-auto"
            src={YoutubeLogo}
            width={100}
            height={70}
          />
        </Link>
      </div>
 
      {matches ? (
        <Search />
      ) : (
        <>
          {openMobileSearch ? (
            <div className="flex items-center gap-x-4">
              <BsArrowLeft
                onClick={() => setOpenMobileSearch(false)}
                className="text-xl text-white cursor-pointer"
              />
              <Search />
            </div>
          ) : (
            <GoSearch
              className="cursor-pointer text-white text-lg"
              onClick={() => setOpenMobileSearch(true)}
            />
          )}
        </>
      )}

      <div className="flex items-center gap-x-2 ">
        {!openMobileSearch && (
          <Button
            text={status === "authenticated" ? "Sign out" : "Sign In"}
            handleClick={() => {
              status === "authenticated" ? handleSignOut() : handleSignIn();
            }}
          />
        )}

        {status === "authenticated" && (
          <>
            {!openMobileSearch && (
              <Link href="/profile">
                <div>
                  <Avatar
                    src={data?.user?.image ?? ""}
                    width={30}
                    height={30}
                  />
                </div>
              </Link>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
