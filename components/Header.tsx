import Image from "next/image";
import Link from "next/link";
import React from "react";
import YoutubeLogo from "../public/youtube.png";
import Button from "./Button";
import Search from "./Search";
import { useSession, signIn, signOut } from "next-auth/react";
import Avatar from "./Avatar";

const Header = () => {
  const { data, status } = useSession();
  const handleSignIn = async () => {
    await signIn("google", {
      callbackUrl: "http://localhost:3000",
    });
  };
  const handleSignOut = async() => {
    await signOut({
      callbackUrl: 'http://localhost:3000/',
    })
  }
  return (
    <div className="p-4 bg-stone-800 fixed top-0 w-full right-0 flex justify-between items-center">
      <Link href="/">
        <Image
          className="cursor-pointer"
          src={YoutubeLogo}
          width={150}
          height={100}
        />
      </Link>
      <Search />
      <div className="flex items-center gap-x-2 ">
        <Button text={status === "authenticated" ? "Sign out" : "Sign In"} handleClick={()=>{
          status ==='authenticated' ? handleSignOut() : handleSignIn()
        }} />
        {status==="authenticated" && (
          <Avatar src={data?.user?.image ?? ""} />

        )}
      </div>
  
    </div>
  );
};

export default Header;
