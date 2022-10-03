import Image from "next/image";
import Link from "next/link";
import React from "react";
import YoutubeLogo from "../public/youtube.png";
import Button from "./Button";
import Search from "./Search";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "./Avatar";
import useMediaQuery from "../hooks/useMediaQuery";
import { GoSearch } from "react-icons/go";

const Header = () => {
  const { data, status } = useSession();
  
  const matches = useMediaQuery('(min-width: 500px)');

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
      <Link href="/">
        <Image
          className="cursor-pointer"
          src={YoutubeLogo}
          width={100}
          height={70}
        />
      </Link>
      {matches ? (
        <Search />

      ):(
        <GoSearch className="cursor-pointer text-white text-lg" />
      )}
      <div className="flex items-center gap-x-2 ">
        <Button
          text={status === "authenticated" ? "Sign out" : "Sign In"}
          handleClick={() => {
            status === "authenticated" ? handleSignOut() : handleSignIn();
          }}
        />
        {status === "authenticated" && (
          <div>
          <a href="/profile">
               <Avatar  src={data?.user?.image ?? ""} width={30} height={30} />
            </a>
          </div>
          


         

        )}
      </div>
    </div>
  );
};

export default Header;
