"use client";
import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { MainContext } from "../components/Context";
import { BsSearch } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import Image from "next/image";
import Link from "next/link";

export const SearchAll = () => {
  const { combined } = useContext(MainContext);
  const [allQuery, setAllQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const ref = useRef(allQuery);
  function ClearInput() {
    setAllQuery("");
    ref.current.value = "";
  }

  const fetchAllSearch = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=d760df5f0ef5e7c8ef5b52b71da88ce8&language=en-US&include_adult=false&query=${allQuery}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (err) {
      console.error(err);
    }
  }, [allQuery]);

  useEffect(() => {
    fetchAllSearch();
  }, [fetchAllSearch]);
  return (
    <div className="relative w-full mx-auto mt-4">
      <div className="flex flex-row items-center justify-center">
        <BsSearch className="text-2xl" />
        <input
          type="text"
          className="max-sm:w-40 ml-2 bg-transparent border-2 border-white rounded-md"
          name="search"
          onChange={(e) => setAllQuery(e.target.value)}
          autoCapitalize="none"
          ref={ref}
          placeholder="Search Bests"
        />
        <VscChromeClose className="text-2xl" onClick={ClearInput} />
      </div>
      <div className="w-full h-full overflow-hidden">
        <ul
          className={`absolute top-10 left-0 right-0 rounded-xl flex flex-col items-start p-3 z-10 lg:w-96 max-lg:w-60 box-content mx-auto   ${
            allQuery === ""
              ? ""
              : "bg-[#6600CC] h-[calc(60vh-0rem)] overflow-y-scroll "
          } `}
        >
          {allQuery === "" ? (
            <li></li>
          ) : (
            searchResults.map((items, index) => {
              const checkPage = items.name ? "series" : "movies";
              return (
                <Link href={`/${checkPage}/${items.id}`} key={index}>
                  <li className="flex flex-row items-center mt-3">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${items.poster_path}`}
                      width={500}
                      height={500}
                      alt={items.name || items.title}
                      className="w-20 h-20 rounded-full ml-5"
                    />
                    <p className="ml-2">
                      {items.name?.substring(0, 25) ||
                        items.title?.substring(0, 25)}
                    </p>
                  </li>
                </Link>
              );
            })
          )}
        </ul>
      </div>
    </div>
  );
};
