"use client";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "/app/components/Context";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";
import Movies from "../../components/Movies";
import Link from "next/link";
import Image from "next/image";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";

const Categories = () => {
  const { merge, setMerge, combined, movies, series } = useContext(MainContext);
  const [filteredMerge, setFilteredMerge] = useState([]);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    setFilteredMerge(combined || []); // Ensure combined is an array or provide a default empty array
  }, [combined, setMerge]);

  return user ? (
    <main>
      <Navbar />
      <section className="flex flex-row mt-5 xl:px-10 px-1">
        <div className="w-full">
          <div className="mt-10">
            <h1 className="text-3xl text-left">Action</h1>
            <div className="w-full flex flex-row overflow-y-scroll items-start py-10 gap-5">
              {/* {filteredMerge
                .filter((items) => items.genres.includes("Drama"))
                .map((items, index) => {
                  return (
                    <Link href={`/bests/${items.title}`} key={index}>
                      <div
                        style={{ backgroundImage: `url("${items.posterUrl}")` }}
                        className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                      ></div>
                    </Link>
                  );
                })} */}
              {filteredMerge.map((items, index) => {
                const checkPage = items.name ? "series" : "movies";
                return (
                  <div key={index}>
                    {items.genres &&
                      items.genres.map((genresItems, genresIndex) => (
                        <div className="flex flex-row" key={genresIndex}>
                          <p>{genresItems.name}</p>
                        </div>
                      ))}
                    <Link href={`/${checkPage}/${items.id}`} key={index}>
                      <div className="relative z-10 hover:scale-105 transition-all duration-700 ease-in-out">
                        <div
                          style={{
                            backgroundImage: `url("${`https://image.tmdb.org/t/p/original${items.poster_path}`}")`,
                          }}
                          className="rounded-lg p-2  shadow-xl hover:shadow-[10px_1px_50px_5px_rgba(0,0,0,0.3)] hover:shadow-fuchsia-800 shadow-fuchsia-950 transition-all duration-700 ease-in-out max-sm:w-28 max-[640px]:w-40 max-[330px]:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center"
                        ></div>
                        <h1 className="flex flex-row items-start justify-center h-20  max-[640px]:w-40 max-[330px]:w-28 max-sm:w-28 w-60 mt-5 max-md:text-sm text-white font-extrabold overflow-hidden">
                          {items.name || items.title}
                        </h1>
                        <h1 className="text-left">{items.year}</h1>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
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

export default Categories;
