import React, { useState } from "react";
import { GoSearch } from "react-icons/go";

const Search = () => {
  const [focus, setFocus] = useState<boolean>(false);
  return (
    <div className="flex-[.5]">
      <div
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        className={`flex  border px-2 gap-x-2 items-center  ${
          focus ? "border-blue-500" :  "border-gray-500"
        }`}
      >
        {focus && (
            <GoSearch className="text-white" />

        )}
        <input
          type="text"
          placeholder="Search"
          className="text-white  w-full outline-none bg-transparent  px-1 py-2"
        />
      </div>
    </div>
  );
};

export default Search;
