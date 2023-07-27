"use client";
import SignIn from "/app/components/SignIn";
import { useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "/app/components/Context";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";
import { SearchMovies } from "/app/components/SearchMovies";

const Movies = () => {
  const { posts } = useContext(MainContext);
  const session = useSession();
  const [authSession, setAuthSession] = useState();
  const [filteredPosts, SetFilteredPosts] = useState(posts);
  const [lowestRange, SetLowestRange] = useState(0);
  const [highestRange, SetHighestRange] = useState(10);
  const [optionValue, SetOptionValue] = useState();

  function FilterAllButtonClick() {
    SetFilteredPosts(
      posts.filter((items) => items.platform.includes(`${optionValue}`))
    );
  }

  function ClearFilterButtonClick() {
    SetFilteredPosts(posts);
  }

  function FilterImdbButtonClick() {
    SetFilteredPosts(
      posts.filter((items) => {
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
  }, [session]);

  return authSession ? (
    <div>
      <Navbar />
      <SearchMovies />
      <div className="flex flex-col  lg:flex lg:flex-row">
        <div className="flex flex-col max-lg:mx-auto w-96 h-2/5 max-lg:w-60 max-md:w-60 max-sm:w-52 text-xl mt-5 ml-2 border-2 rounded-xl">
          <div className="flex flex-col items-center justify-center p-5">
            <select
              name=""
              onChange={(e) => SetOptionValue(e.target.value)}
              className="bg-black border-2"
            >
              <option value="">Select Platform...</option>
              <option value="Netflix">Netflix</option>
              <option value="Amazon">Amazon</option>
              <option value="YouTube">YouTube</option>
            </select>
            <div className="flex flex-col">
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
            <button
              onClick={FilterAllButtonClick}
              className="p-1 mr-2 mt-2 border-2 rounded-2xl border-sky-100"
            >
              ApplyFilter
            </button>
            <button
              onClick={ClearFilterButtonClick}
              className="p-1 mr-2 mt-2 border-2 rounded-2xl border-sky-100"
            >
              Clear
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-5 max-[1364px]:grid-cols-3 max-[1650px]:grid-cols-4   max-[1100px]:grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 justify-items-center mt-10">
            {filteredPosts.map((items, index) => {
              return (
                <div
                  key={index}
                  className="border  rounded-2xl p-2 my-10 shadow-lg shadow-slate-500"
                >
                  <div
                    style={{ backgroundImage: `url("${items.posterUrl}")` }}
                    className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                  ></div>
                  <h1 className="text-left mt-2 text-white font-extrabold">
                    {items.title.substring(0, 13)}
                  </h1>
                  <h1 className="text-left ">{items.year}</h1>
                  <h1 className="text-left block max-md:hidden">
                    {items.genres}
                  </h1>
                </div>
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

export default Movies;
