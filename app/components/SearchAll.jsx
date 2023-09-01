"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { MainContext } from "../components/Context";
import { BsSearch } from "react-icons/bs";
import { VscChromeClose } from "react-icons/vsc";
import Image from "next/image";
import Link from "next/link";

export const SearchAll = () => {
  const { combined } = useContext(MainContext);
  const [allQuery, setAllQuery] = useState("");

  console.log("asd");
  const ref = useRef(allQuery);
  function ClearInput() {
    setAllQuery("");
    ref.current.value = "";
  }
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center w-80">
        <div className="relative w-80">
          <div className="flex flex-row items-center justify-center">
            <BsSearch className="text-2xl" />
            <input
              type="text"
              className="max-sm:w-40 ml-2 bg-transparent border-2 border-white rounded-md"
              name="search"
              onChange={(e) => setAllQuery(e.target.value)}
              ref={ref}
            />
            <VscChromeClose className="text-2xl" onClick={ClearInput} />
          </div>
          <div className="w-full h-full overflow-hidden">
            <ul
              className={`absolute top-10 left-0 right-0 rounded-xl flex flex-col items-start p-3 z-10 lg:w-96 max-lg:w-60 box-content mx-auto   ${
                allQuery === ""
                  ? ""
                  : "bg-[#6600CC] h-[calc(35rem-5rem)] overflow-y-scroll "
              } `}
            >
              {allQuery === "" ? (
                <li></li>
              ) : (
                combined
                  .filter((items) =>
                    items.title.toLowerCase().includes(allQuery)
                  )
                  .map((items, index) => {
                    return (
                      <Link href={`/bests/${items.title}`} key={index}>
                        <li className="flex flex-row items-center mt-3">
                          <Image
                            src={`${items.posterUrl}`}
                            width={500}
                            height={500}
                            alt="about-image"
                            className="w-20 h-20 rounded-full ml-5"
                          />
                          <p className="ml-2">{items.title}</p>
                        </li>
                      </Link>
                    );
                  })
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
