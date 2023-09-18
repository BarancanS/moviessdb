"use client";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "/app/components/Context";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";
import { SearchMovies } from "/app/components/SearchMovies";
import { AiFillCaretDown, AiFillCaretRight } from "react-icons/ai";
import Link from "next/link";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";

const Movies = () => {
  const { movies, setIncreasePage, increasePage } = useContext(MainContext);
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [lowestRange, SetLowestRange] = useState(0);
  const [highestRange, SetHighestRange] = useState(10);
  const [platformValue, SetPlatformValue] = useState();
  const [filterBoolean, SetFilterBoolean] = useState(false);
  const [sortBoolean, SetSortBoolean] = useState(false);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [status, setStatus] = useState(true);
  const [loadMore, setLoadMore] = useState(12);

  const buttonClasses =
    "border p-2 rounded-xl flex flex-row max-lg:w-40 w-60 mt-3";
  function FilterAllButtonClick() {
    setFilteredMovies(
      movies
        .slice(0, loadMore)
        .filter((items) => items.platform.includes(`${platformValue}`))
    );
  }

  function ClearFilterButtonClick() {
    setFilteredMovies(movies.slice(0, loadMore));
  }

  function FilterImdbButtonClick() {
    setFilteredMovies(
      movies.filter((items) => {
        return items.imdb >= lowestRange && items.imdb <= highestRange;
      })
    );
  }
  useEffect(() => {
    setFilteredMovies(movies);
  }, [movies, increasePage]);
  return user ? (
    <div>
      <Navbar />
      <SearchMovies />
      <div className="flex flex-col lg:flex lg:flex-row">
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
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center mt-10">
            {filteredMovies.slice(0, loadMore).map((items, index) => (
              <Link href={`/movies/${items.id}`} key={index}>
                <div className="rounded-sm p-2 my-10 shadow-xl hover:shadow-[10px_10px_100px_10px_rgba(0,0,0,0.3)] hover:shadow-fuchsia-800 shadow-fuchsia-950 hover:scale-105 transition-all duration-700 ease-in-out">
                  <div
                    style={{
                      backgroundImage: `url("${`https://image.tmdb.org/t/p/original${items.poster_path}`}")`,
                    }}
                    className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-sm  "
                  ></div>
                  <h1 className="text-left h-20 max-sm:w-28 w-60 mt-2 max-md:text-sm text-white font-extrabold overflow-hidden">
                    {items.title}
                  </h1>
                  <h1 className="text-left">{items.year}</h1>
                  {/* <h1 className="text-left block max-md:hidden">
                    {items.genres
                      .toString()
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                  </h1> */}
                </div>
              </Link>
            ))}
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
    </div>
  ) : (
    <div>
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
    </div>
  );
};

export default Movies;