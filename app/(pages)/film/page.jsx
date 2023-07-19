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

  function FilterNetflixButtonClick() {
    SetFilteredPosts(
      posts.filter((items) => items.platform.includes("Netflix"))
    );
  }
  function FilterAmazonButtonClick() {
    SetFilteredPosts(
      posts.filter((items) => items.platform.includes("Amazon"))
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
  });
  return authSession ? (
    <div>
      <Navbar />
      <SearchMovies />
      <div className="max-xl:flex max-xl:flex-row">
        <div className="flex flex-col items-start mx-auto w-30 justify-start text-xl mt-5">
          <button
            onClick={FilterNetflixButtonClick}
            className="p-1 mr-2 mt-2 border-2 rounded-2xl border-sky-100"
          >
            Netflix
          </button>
          <button
            onClick={FilterAmazonButtonClick}
            className="p-1 mr-2 mt-2 border-2 rounded-2xl border-sky-100"
          >
            Amazon
          </button>
          <button
            onClick={ClearFilterButtonClick}
            className="p-1 mr-2 mt-2 border-2 rounded-2xl border-sky-100"
          >
            Clear
          </button>
          <button
            onClick={FilterImdbButtonClick}
            className="p-1 mr-2 mt-2 border-2 rounded-2xl border-sky-100"
          >
            Imdb
          </button>
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
        <div className="w-9/12 min-h-[calc(100vh-15rem)] mx-auto">
          <div className="grid grid-cols-5  max-2xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 justify-items-center mt-10">
            {filteredPosts.map((items, index) => {
              return (
                <div key={index}>
                  <div
                    style={{ backgroundImage: `url("${items.imageUrl}")` }}
                    className="max-sm:w-32 max-sm:h-44 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                  ></div>
                  <h1 className="text-center mt-10">{items.title}</h1>
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
