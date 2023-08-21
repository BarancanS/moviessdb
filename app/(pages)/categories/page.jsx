"use client";
import SignIn from "/app/components/SignIn";
import { useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "/app/components/Context";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";
import Films from "../../components/Films";
import Link from "next/link";
import Image from "next/image";

const Categories = () => {
  const { merge, setMerge, combined, posts, series } = useContext(MainContext);
  const session = useSession();
  const [authSession, setAuthSession] = useState();
  const [filteredMerge, SetFilteredMerge] = useState(merge);

  useEffect(() => {
    setMerge(combined);
    SetFilteredMerge(combined);
    if (session.status === "unauthenticated") {
      setAuthSession(false);
    } else {
      setAuthSession(true);
    }
  }, [session]);
  return authSession ? (
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
    <main className="w-full min-h-[calc(100vh-10rem)] flex items-center justify-center">
      <SignIn />
    </main>
  );
};

export default Categories;
