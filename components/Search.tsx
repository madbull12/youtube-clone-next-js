import { useRouter } from "next/router";
import React, { useState } from "react";
import { GoSearch } from "react-icons/go";

const Search = () => {
  const [focus, setFocus] = useState<boolean>(false);
  const [term, setTerm] = useState<string>("");
  const router = useRouter();


  return (
    <div className="flex-[.5]">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search?results=${term}`);
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`flex relative  border px-2 gap-x-2 items-center  ${
          focus ? "border-blue-500" : "border-gray-500"
        }`}
      >
        {focus && <GoSearch className="text-white" />}
        <input
          onChange={(e) => setTerm(e.target.value)}
          type="text"
          placeholder="Search"
          className="text-white  w-full outline-none bg-transparent  px-1 py-2"
        />
        <button
          className="bg-gray-500 py-2 px-4 absolute h-full right-0 "
          type="submit"
        >
          <GoSearch className="text-white" />
        </button>
      </form>
    </div>
  );
};

export default Search;
