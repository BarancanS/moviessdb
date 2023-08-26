"use client";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "/app/components/Context";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";
import Films from "../../components/Films";
import Link from "next/link";
import Image from "next/image";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";

const Categories = () => {
  const { merge, setMerge, combined, posts, series } = useContext(MainContext);
  const [filteredMerge, SetFilteredMerge] = useState(merge);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [status, setStatus] = useState(true);

  useEffect(() => {
    setMerge(combined);
    SetFilteredMerge(combined);
  }, [posts, series]);
  return user ? (
    <main>
      <Navbar />
      <section className="flex flex-row mt-5 xl:px-10 px-1">
        <div className="w-full">
          <div className="mt-10">
            <h1 className="text-3xl text-left">Action</h1>
            <div className="w-full flex flex-row overflow-y-scroll items-start py-10 gap-5">
              {filteredMerge
                .filter((items) => items.genres.includes("Action"))
                .map((items, index) => {
                  return (
                    <Link href={`/bests/${items.title}`} key={index}>
                      <div
                        style={{
                          backgroundImage: `url("${items.posterUrl}")`,
                        }}
                        className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                      ></div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-3xl text-left">Drama</h1>
            <div className="w-full flex flex-row overflow-y-scroll items-start py-10 gap-5">
              {filteredMerge
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
                })}
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-3xl text-left">Comedy</h1>
            <div className="w-full flex flex-row overflow-y-scroll items-start py-10 gap-5">
              {filteredMerge
                .filter((items) => items.genres.includes("Comedy"))
                .map((items, index) => {
                  return (
                    <Link href={`/bests/${items.title}`} key={index}>
                      <div
                        style={{ backgroundImage: `url("${items.posterUrl}")` }}
                        className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                      ></div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-3xl text-left">Fantasy</h1>
            <div className="w-full flex flex-row overflow-y-scroll items-start py-10 gap-5">
              {filteredMerge
                .filter((items) => items.genres.includes("Fantasy"))
                .map((items, index) => {
                  return (
                    <Link href={`/bests/${items.title}`} key={index}>
                      <div
                        style={{ backgroundImage: `url("${items.posterUrl}")` }}
                        className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                      ></div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-3xl text-left">Action</h1>
            <div className="w-full flex flex-row overflow-y-scroll items-start py-10 gap-5">
              {filteredMerge
                .filter((items) => items.genres.includes("Action"))
                .map((items, index) => {
                  return (
                    <Link href={`/bests/${items.title}`} key={index}>
                      <div
                        style={{ backgroundImage: `url("${items.posterUrl}")` }}
                        className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                      ></div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-3xl text-left">Crime</h1>
            <div className="w-full flex flex-row overflow-y-scroll items-start py-10 gap-5">
              {filteredMerge
                .filter((items) => items.genres.includes("Crime"))
                .map((items, index) => {
                  return (
                    <Link href={`/bests/${items.title}`} key={index}>
                      <div
                        style={{ backgroundImage: `url("${items.posterUrl}")` }}
                        className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                      ></div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-3xl text-left">Music</h1>
            <div className="w-full flex flex-row overflow-y-scroll items-start py-10 gap-5">
              {filteredMerge
                .filter((items) => items.genres.includes("Music"))
                .map((items, index) => {
                  return (
                    <Link href={`/bests/${items.title}`} key={index}>
                      <div
                        style={{ backgroundImage: `url("${items.posterUrl}")` }}
                        className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                      ></div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-3xl text-left">Adventure</h1>
            <div className="w-full flex flex-row overflow-y-scroll items-start py-10 gap-5">
              {filteredMerge
                .filter((items) => items.genres.includes("Adventure"))
                .map((items, index) => {
                  return (
                    <Link href={`/bests/${items.title}`} key={index}>
                      <div
                        style={{ backgroundImage: `url("${items.posterUrl}")` }}
                        className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                      ></div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-3xl text-left">History</h1>
            <div className="w-full flex flex-row overflow-y-scroll items-start py-10 gap-5">
              {filteredMerge
                .filter((items) => items.genres.includes("History"))
                .map((items, index) => {
                  return (
                    <Link href={`/bests/${items.title}`} key={index}>
                      <div
                        style={{ backgroundImage: `url("${items.posterUrl}")` }}
                        className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                      ></div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-3xl text-left">Thriller</h1>
            <div className="w-full flex flex-row overflow-y-scroll items-start py-10 gap-5">
              {filteredMerge
                .filter((items) => items.genres.includes("Thriller"))
                .map((items, index) => {
                  return (
                    <Link href={`/bests/${items.title}`} key={index}>
                      <div
                        style={{ backgroundImage: `url("${items.posterUrl}")` }}
                        className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                      ></div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-3xl text-left">Family</h1>
            <div className="w-full flex flex-row overflow-y-scroll items-start py-10 gap-5">
              {filteredMerge
                .filter((items) => items.genres.includes("Family"))
                .map((items, index) => {
                  return (
                    <Link href={`/bests/${items.title}`} key={index}>
                      <div
                        style={{ backgroundImage: `url("${items.posterUrl}")` }}
                        className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                      ></div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-3xl text-left">Mystery</h1>
            <div className="w-full flex flex-row overflow-y-scroll items-start py-10 gap-5">
              {filteredMerge
                .filter((items) => items.genres.includes("Mystery"))
                .map((items, index) => {
                  return (
                    <Link href={`/bests/${items.title}`} key={index}>
                      <div
                        style={{ backgroundImage: `url("${items.posterUrl}")` }}
                        className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                      ></div>
                    </Link>
                  );
                })}
            </div>
          </div>
          <div className="mt-10">
            <h1 className="text-3xl text-left">Biography</h1>
            <div className="w-full flex flex-row overflow-y-scroll items-start py-10 gap-5">
              {filteredMerge
                .filter((items) => items.genres.includes("Biography"))
                .map((items, index) => {
                  return (
                    <Link href={`/bests/${items.title}`} key={index}>
                      <div
                        style={{ backgroundImage: `url("${items.posterUrl}")` }}
                        className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                      ></div>
                    </Link>
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
