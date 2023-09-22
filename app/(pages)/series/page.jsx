"use client";
import React, { useState, useEffect, useContext } from "react";
import { MainContext } from "/app/components/Context";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";
import { SearchSeries } from "/app/components/SearchSeries";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";

const SeriesContent = ({
  series,
  increasePage,
  setIncreasePage,
  filteredSeries, // Pass filteredSeries as a prop
  setFilteredSeries, // Pass setFilteredSeries as a prop
}) => {
  const [lowestRange, SetLowestRange] = useState(0);
  const [highestRange, SetHighestRange] = useState(10);
  const [platformValue, SetPlatformValue] = useState();
  const [filterBoolean, SetFilterBoolean] = useState(false);
  const [sortBoolean, SetSortBoolean] = useState(false);

  const buttonClasses =
    "border p-2 rounded-xl flex flex-row max-lg:w-40 w-60 mt-3";

  function FilterAllButtonClick() {
    setFilteredSeries(
      series
        .slice(0, 12)
        .filter((items) => items.platform.includes(`${platformValue}`))
    );
  }

  function ClearFilterButtonClick() {
    setFilteredSeries(series.slice(0, 12));
  }

  function FilterImdbButtonClick() {
    setFilteredSeries(
      series.filter((items) => {
        return items.imdb >= lowestRange && items.imdb <= highestRange;
      })
    );
  }

  useEffect(() => {
    setFilteredSeries(series);
  }, [series]);

  return (
    <div>
      <SearchSeries />
      <div className="flex flex-col lg:flex lg:flex-row  lg:mt-16">
        <div className="flex flex-col max-lg:mx-auto w-96 h-2/5 max-lg:w-60 max-md:w-60 max-sm:w-52 text-xl mt-20 ml-2 border-2 rounded-xl">
          <div className="flex flex-col items-center justify-center p-5">
            <div className="flex flex-col items-center justify-center">
              <button
                className={`border p-2 rounded-xl flex flex-row ${buttonClasses}`}
                onClick={() => SetFilterBoolean(!filterBoolean)}
              >
                Filter
                {filterBoolean ? (
                  <AiFillCaretDown className="mt-1" />
                ) : (
                  <AiFillCaretRight className="mt-1" />
                )}
              </button>
              {filterBoolean && (
                <section className="flex flex-col items-center justify-center mt-1">
                  <select
                    name=""
                    onChange={(e) => SetPlatformValue(e.target.value)}
                    className="bg-black border-2"
                  >
                    <option value="">Select Platform</option>
                    <option value="Netflix">Netflix</option>
                    <option value="Amazon">Amazon</option>
                    <option value="YouTube">YouTube</option>
                  </select>
                  {/* Add more select options here */}
                  <div className="flex flex-col mt-5">
                    <input
                      type="range"
                      id="vol"
                      name="vol"
                      min="0"
                      max="10"
                      value={lowestRange}
                      step={0.1}
                      onChange={(e) => SetLowestRange(e.target.value)}
                    />
                    <p>{lowestRange}</p>
                    <input
                      type="range"
                      id="vol"
                      name="vol"
                      min="0"
                      max="10"
                      value={highestRange}
                      step={0.1}
                      onChange={(e) => SetHighestRange(e.target.value)}
                    />
                    <p>{highestRange}</p>
                  </div>
                </section>
              )}
              <button
                className={`border p-2 rounded-xl flex flex-row ${buttonClasses}`}
                onClick={() => SetSortBoolean(!sortBoolean)}
              >
                Sort by
                {sortBoolean ? (
                  <AiFillCaretDown className="mt-1" />
                ) : (
                  <AiFillCaretRight className="mt-1" />
                )}
              </button>
              {sortBoolean && (
                <section className="flex flex-col items-center justify-center mt-3">
                  <select
                    name=""
                    onChange={(e) => SetPlatformValue(e.target.value)}
                    className="bg-black border-2"
                  >
                    <option value="Netflix">Increased Votes</option>
                    <option value="Amazon">Decreased Votes</option>
                    <option value="YouTube">A to Z</option>
                  </select>
                </section>
              )}
            </div>

            <button
              onClick={FilterAllButtonClick}
              className={`text-white font-bold p-2 ${buttonClasses} bg-red-600`}
            >
              Apply Filter
            </button>
            <button
              onClick={ClearFilterButtonClick}
              className={`text-red-600 font-bold p-2 ${buttonClasses} bg-white`}
            >
              Clear
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-2 max-[500px]:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center mt-10">
            {filteredSeries.map((items, index) => {
              return (
                <Link href={`/series/${items.id}`} key={index}>
                  <div
                    style={{
                      backgroundImage: `url("${`https://image.tmdb.org/t/p/original${items.poster_path}`}")`,
                    }}
                    className="rounded-lg p-2  shadow-xl hover:shadow-[10px_1px_50px_5px_rgba(0,0,0,0.3)] hover:shadow-fuchsia-800 shadow-fuchsia-950 hover:scale-105 transition-all duration-300 ease-in-out w-60 h-80 bg-cover bg-no-repeat bg-center"
                  ></div>
                  <h1 className="flex flex-row items-start justify-center w-60 h-20 mt-5 max-md:text-sm text-white font-extrabold overflow-hidden">
                    {items.name}
                  </h1>
                  <h1 className="text-left">{items.year}</h1>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full text-center">
        {increasePage > 1 ? (
          <button
            className="w-30 p-2 text-white font-semibold rounded-md bg-red-600"
            onClick={() => setIncreasePage(increasePage - 1)}
          >
            Previous Page
          </button>
        ) : (
          <></>
        )}
        {increasePage >= 1 ? (
          <button
            className="w-30 p-2 ml-2 text-black font-semibold rounded-md bg-white"
            onClick={() => setIncreasePage(increasePage + 1)}
          >
            Next Page
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const Series = () => {
  const { series, setIncreasePage, increasePage } = useContext(MainContext);
  const [filteredSeries, setFilteredSeries] = useState(series); // Initialize filteredSeries

  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [status, setStatus] = useState(true);

  const handleStatusChange = () => {
    setStatus(!status);
  };
  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0C0C0C]">
        <Image
          src={`/loader1.gif`}
          width={500}
          height={500}
          alt="loading gif"
          className="w-5/12 mx-auto h-auto rounded-lg"
          priority={true}
        />
      </div>
    );
  }

  return user ? (
    <div>
      <Navbar />
      <SeriesContent
        series={series}
        increasePage={increasePage}
        setIncreasePage={setIncreasePage}
        filteredSeries={filteredSeries} // Pass filteredSeries as a prop
        setFilteredSeries={setFilteredSeries} // Pass setFilteredSeries as a prop
      />
      <Footer />
    </div>
  ) : (
    <div>
      {status ? (
        <div
          className="w-full flex flex-col items-center justify-center h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url("${`/pexels-james-wheeler-1519088.jpg`}")`,
          }}
        >
          <SignIn />
          <button
            onClick={handleStatusChange}
            className="bg-blue-500 hover:bg-blue-600 text-white mt-20 py-2 px-4 rounded-md font-bold flex items-center justify-center"
          >
            Register Page
          </button>
        </div>
      ) : (
        <div
          className="w-full flex flex-col items-center justify-center h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url("${`/pexels-piccinng-3075993.jpg`}")`,
          }}
        >
          <SignUp />
          <button
            onClick={handleStatusChange}
            className="bg-blue-500 hover:bg-blue-600 text-white mt-20 py-2 px-4 rounded-md font-bold flex items-center justify-center"
          >
            Login Page
          </button>
        </div>
      )}
    </div>
  );
};

export default Series;
