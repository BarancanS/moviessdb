"use client";
import SignIn from "/app/components/SignIn";
import { useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "/app/components/Context";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";
import { SearchSeries } from "/app/components/SearchSeries";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import Link from "next/link";

const Series = () => {
  const { series } = useContext(MainContext);
  const session = useSession();
  const [authSession, setAuthSession] = useState();
  const [filteredSeries, SetFilteredSeries] = useState(series);
  const [lowestRange, SetLowestRange] = useState(0);
  const [highestRange, SetHighestRange] = useState(10);
  const [platformValue, SetPlatformValue] = useState();
  const [filterBoolean, SetFilterBoolean] = useState(false);
  const [sortBoolean, SetSortBoolean] = useState(false);

  function FilterAllButtonClick() {
    SetFilteredSeries(
      series.filter((items) => items.platform.includes(`${platformValue}`))
    );
  }

  function ClearFilterButtonClick() {
    SetFilteredSeries(series);
  }

  function FilterImdbButtonClick() {
    SetFilteredSeries(
      series.filter((items) => {
        return items.imdb >= lowestRange && items.imdb <= highestRange;
      })
    );
  }
  useEffect(() => {
    if (session.status === "unauthenticated") {
      setAuthSession(false);
    } else {
      setAuthSession(true);
    }
    SetFilteredSeries(series);
  }, [session, series]);

  return authSession ? (
    <div>
      <Navbar />
      <SearchSeries />
      <div className="flex flex-col  lg:flex lg:flex-row">
        <div className="flex flex-col max-lg:mx-auto w-96 h-2/5 max-lg:w-60 max-md:w-60 max-sm:w-52 text-xl  mt-20 ml-2 border-2 rounded-xl ">
          <div className="flex flex-col items-center justify-center p-5">
            <div className="flex flex-col items-center justify-center">
              <button
                className="border p-2 rounded-xl flex flex-row max-lg:w-40 w-60"
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
                    <option value="">Select Platform.</option>
                    <option value="Netflix">Netflix</option>
                    <option value="Amazon">Amazon</option>
                    <option value="YouTube">YouTube</option>
                  </select>
                  <select
                    name=""
                    // onChange={(e) => SetPlatformValue(e.target.value)}
                    className="bg-black border-2 mt-5"
                  >
                    <option value="">Select Category</option>
                    <option value="Netflix">Dram</option>
                    <option value="Amazon">Action</option>
                    <option value="YouTube">Adventure</option>
                  </select>
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
                className="border p-2 rounded-xl flex flex-row max-lg:w-40 w-60 mt-3"
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
              className="text-white font-bold p-2 rounded-xl flex flex-row items-center justify-center max-lg:w-40 w-60 mt-3 bg-red-600"
            >
              ApplyFilter
            </button>
            <button
              onClick={ClearFilterButtonClick}
              className="text-red-600 font-bold p-2 rounded-xl flex flex-row items-center justify-center  max-lg:w-40 w-60 mt-3 bg-white"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-5 max-[1364px]:grid-cols-3 max-[1650px]:grid-cols-4   max-[1100px]:grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 justify-items-center mt-10">
            {filteredSeries.map((items, index) => {
              return (
                <Link key={index} href={`/series/${items.title}`}>
                  <div className="border  rounded-2xl p-2 my-10 shadow-lg shadow-slate-500">
                    <div
                      style={{ backgroundImage: `url("${items.posterUrl}")` }}
                      className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                    ></div>
                    <h1 className="text-left mt-2 text-white font-extrabold">
                      {items.title.substring(0, 13)}
                    </h1>
                    <h1 className="text-left ">{items.year}</h1>
                    <h1 className="text-left block max-md:hidden">
                      {items.genres
                        .toString()
                        .replace(/([A-Z])/g, " $1")
                        .trim()}
                    </h1>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <main className="w-full min-h-[calc(100vh-10rem)] flex items-center justify-center">
      <SignIn />
    </main>
  );
};

export default Series;
