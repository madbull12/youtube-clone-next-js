import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { GoSearch } from "react-icons/go";
import { v4 } from "uuid";
import useDebounce from "../hooks/useDebounce";
import useMediaQuery from "../hooks/useMediaQuery";
import useOutsideClick from "../hooks/useOutsideClick";
import { youtubeAutoComplete } from "../lib/axios";

const Search = () => {
  const [focus, setFocus] = useState<boolean>(false);
  const [data, setData] = useState<any>(null);
  const [term, setTerm] = useState<string>("");
  const router = useRouter();
  const [openAutocomplete, setOpenAutocomplete] = useState<boolean>(true);
  const matches = useMediaQuery("(min-width: 500px)");

  const debouncedSearch = useDebounce(term, 500);

  const ref = useRef(null);

  useOutsideClick(ref, () => {
    setOpenAutocomplete(false);
  });

  useEffect(() => {
    // https://youtube138.p.rapidapi.com/auto-complete/

    async function fetchData() {
      try {
        const response = await youtubeAutoComplete.get(`?q=${debouncedSearch}`);
        // const data = await response.json();
        setData(response.data);
        console.log(data);
      } catch (err: any) {
        console.log(err);
      }
    }

    if (debouncedSearch) fetchData();
  }, [debouncedSearch]);

  return (
    <div className={`${matches ? "w-1/2" : "w-full"} relative`}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setOpenAutocomplete(false);

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
          onClick={() => setOpenAutocomplete(true)}
          onChange={(e) => setTerm(e.target.value)}
          type="search"
          placeholder="Search"
          value={term}
          className="text-white  w-full outline-none bg-transparent  px-1 py-2"
        />
        <button
          className="bg-gray-500 py-2 px-4 absolute h-full right-0 "
          type="submit"
        >
          <GoSearch className="text-white" />
        </button>
      </form>
      {openAutocomplete && (
        <>
          {debouncedSearch && data && (
            <div className="absolute  w-full py-2  top-full bg-white" ref={ref}>
              {data?.results.map((item: string) => (
                <div
                  key={v4()}
                  onClick={() => setTerm(item)}
                  className="flex gap-x-2 items-center py-1 px-2 hover:bg-gray-100 cursor-pointer"
                >
                  <GoSearch />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
