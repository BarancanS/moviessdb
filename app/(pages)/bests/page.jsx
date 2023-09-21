"use client";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "/app/components/Context";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";
import { SearchAll } from "/app/components/SearchAll";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import Link from "next/link";
import Image from "next/image";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";

const Bests = () => {
  const { merge, combined, setIncreasePage, increasePage } =
    useContext(MainContext);
  const [filteredMerge, SetFilteredMerge] = useState(combined);
  const [lowestRange, SetLowestRange] = useState(0);
  const [highestRange, SetHighestRange] = useState(10);
  const [platformValue, SetPlatformValue] = useState("");
  const [filterBoolean, SetFilterBoolean] = useState(false);
  const [sortBoolean, SetSortBoolean] = useState(false);

  // Move the auth and user-related hooks outside of the conditional block
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    SetFilteredMerge(combined);
  }, [combined, loading]);
  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0C0C0C]">
        <Image
          src={`/loader1.gif`}
          width={500}
          height={500}
          alt="loading gif"
          className="w-5/12 mx-auto h-auto rounded-lg "
        />
      </div>
    );
  }

  const buttonClasses =
    "border p-2 rounded-xl flex flex-row max-lg:w-40 w-60 mt-3";

  function FilterAllButtonClick() {
    SetFilteredMerge(
      combined
        .slice(0, 12)
        .filter((items) => items.platform.includes(platformValue))
    );
  }

  function ClearFilterButtonClick() {
    SetFilteredMerge(combined.slice(0, 12));
  }

  function FilterImdbButtonClick() {
    SetFilteredMerge(
      merge.filter((items) => {
        return items.imdb >= lowestRange && items.imdb <= highestRange;
      })
    );
  }

  return (
    <div>
      {user ? (
        <>
          <Navbar />
          <SearchAll />
          <div className="flex flex-col lg:flex lg:flex-row lg:mt-16">
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
                {filteredMerge.map((items, index) => {
                  const checkPage = items.name ? "series" : "movies";
                  return (
                    <Link href={`/${checkPage}/${items.id}`} key={index}>
                      <div
                        style={{
                          backgroundImage: `url("${`https://image.tmdb.org/t/p/original${items.poster_path}`}")`,
                        }}
                        className="rounded-lg p-2  shadow-xl hover:shadow-[10px_1px_50px_5px_rgba(0,0,0,0.3)] hover:shadow-fuchsia-800 shadow-fuchsia-950 hover:scale-105 transition-all duration-300 ease-in-out w-60 h-80 bg-cover bg-no-repeat bg-center"
                      ></div>
                      <h1 className="flex flex-row items-start justify-center w-60 h-20 mt-5 max-md:text-sm text-white font-extrabold overflow-hidden">
                        {items.name || items.title}
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
          <Footer />
        </>
      ) : (
        <>
          {status ? (
            <div className="w-full flex flex-col items-center justify-center">
              <SignIn />
              <button
                onClick={() => setStatus(!status)}
                className="text-white font-medium bg-slate-600 w-56 h-10 rounded-xl p-2 flex flex-row items-center justify-center cursor-pointer"
              >
                Register Page
              </button>
            </div>
          ) : (
            <div className="w-full flex flex-col items-center justify-center">
              <SignUp />
              <button
                onClick={() => setStatus(!status)}
                className="text-white font-medium bg-slate-600 w-56 h-10 rounded-xl p-2 flex flex-row items-center justify-center cursor-pointer"
              >
                Login Page
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Bests;
