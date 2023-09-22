"use client";
import React, { useState, useEffect, useContext } from "react";
import { MainContext } from "/app/components/Context";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";
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

  const handleStatusChange = () => {
    setStatus(!status);
  };
  useEffect(() => {
    setFilteredMerge(combined || []); // Ensure combined is an array or provide a default empty array
  }, [combined, setMerge]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-[#0C0C0C]">
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

  return (
    <main>
      {user ? (
        // Render the logged-in state
        <>
          <Navbar />
          <section className="flex flex-row xl:px-10 px-1 min-h-[calc(100vh-13rem)] max-lg:mt-16 mt-20">
            <div className="w-full">
              <div className="mt-10">
                <h1 className="text-3xl text-left">Action</h1>
                <div className="w-full flex flex-row overflow-y-scroll items-start py-10 gap-5">
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
                          <div
                            style={{
                              backgroundImage: `url("${`https://image.tmdb.org/t/p/original${items.poster_path}`}")`,
                            }}
                            className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-300 ease-in-out"
                          ></div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
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
      )}
    </main>
  );
};

export default Categories;
