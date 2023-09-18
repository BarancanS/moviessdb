"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MainContext } from "../components/Context";
import { useContext } from "react";
const Movies = () => {
  const { movies } = useContext(MainContext);
  return (
    <section className="flex flex-row mt-5">
      <div className="2xl:w-9/12 w-full">
        <h1 className="mb-3 ml-3 text-3xl text-left">Trend Movies</h1>
        <div className="w-11/12 flex flex-row overflow-y-scroll items-start py-10 mx-auto pl-2  h-fit gap-5">
          {movies.slice(0, 20).map((items, index) => {
            return (
              <Link href={`movies/${items.id}`} key={index}>
                <div key={index}>
                  <div
                    style={{
                      backgroundImage: `url("${`https://image.tmdb.org/t/p/original${items.poster_path}`}")`,
                    }}
                    className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-300 ease-in-out"
                  ></div>
                  {/* <h1 className="text-left mt-3">{items.plot}</h1> */}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="w-3/12 flex flex-col items-left max-[1800px]:hidden ">
        <h1 className="mb-3 ml-1 font-extrabold text-xl">Trend Movies</h1>
        <div className="flex flex-col">
          <div className="w-96 bg-stone-700  p-4 rounded-2xl ">
            {movies.slice(0, 6).map((items, index) => {
              return (
                <Link href={`movies/${items.id}`} key={index}>
                  <div className="flex flex-row items-center mb-2">
                    <div className="w-3/12">
                      <Image
                        src={`https://image.tmdb.org/t/p/original${items.poster_path}`}
                        width={500}
                        height={500}
                        alt="about-image"
                        className="w-20 h-20 rounded-full"
                      />
                    </div>
                    <div className="w-9/12">
                      <h1 className="text-black font-bold text-base">
                        {items.title}
                      </h1>
                      <h4 className="text-sm font-bold whitespace-wrap overflow-ellipsis">
                        {items.overview.substring(0, 60)}
                        <span className="text-red-500 ">...Read More</span>
                      </h4>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Movies;
