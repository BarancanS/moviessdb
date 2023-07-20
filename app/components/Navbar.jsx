"use client";
import React, { useEffect } from "react";
import { FaHamburger } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import Link from "next/link";
import SignIn from "./SignIn";
import { useSession } from "next-auth/react";
import Image from "next/image";
const Navbar = () => {
  const [hamburgerMenu, setHamburgerMenu] = React.useState(false);
  const session = useSession();
  const [authSession, setAuthSession] = React.useState();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      setAuthSession(false);
    } else {
      setAuthSession(true);
    }
  });
  return (
    <div className="h-20 w-10/12 mx-auto flex flex-row justify-between items-center">
      <Link href="/">
        <h1 className="text-3xl">BaranFlix</h1>
      </Link>
      <div className="flex flex-row justify-center items-center gap-5 max-lg:hidden">
        <ul className="flex flex-row justify-center items-center gap-5 max-lg:hidden">
          <Link href="/film">
            <li>Film</li>
          </Link>
          <Link href="/series">
            <li>Series</li>
          </Link>
          <Link href="/bests">
            <li>Bests</li>
          </Link>
          <Link href="/categories">
            <li>Categories</li>
          </Link>
          <Link href="/platform">
            <li>Platform</li>
          </Link>
          <li>
            <SignIn />
          </li>
        </ul>
        {/* Burayi Image elementi ile değiştirmeyi unutma */}
        <img
          src={authSession ? session?.data?.user?.image : "/john-wick.jpg"}
          alt="user-image"
          className="rounded-full w-[4rem] h-[4rem]"
        />
      </div>
      <FaHamburger
        className="lg:hidden text-2xl"
        onClick={() => setHamburgerMenu(!hamburgerMenu)}
      />
      {hamburgerMenu && (
        <section className="lg:hidden block fixed z-10 top-0 left-0 npm w-1/2 bg-slate-900 rounded-r-xl">
          <main className="flex flex-col">
            <div className="flex w-11/12 mx-auto mt-2 flex-row justify-between">
              <Link href="/" onClick={() => setHamburgerMenu(!hamburgerMenu)}>
                <h1 className="max-sm:text-lg max-md:text-2xl max-lg:text-3xl">
                  BaranFlix
                </h1>
                <div className="flex flex-col gap-2">
                  <img
                    src={
                      authSession
                        ? session?.data?.user?.image
                        : "/john-wick.jpg"
                    }
                    alt="user-image"
                    className="rounded-full w-[4rem] h-[4rem]"
                  />
                  <div className="flex flex-row gap-2">
                    <Link href="">
                      <button className="bg-red-600 rounded-xl p-2 w-24 h-18">
                        Profile
                      </button>
                    </Link>
                    <SignIn />
                  </div>
                </div>
              </Link>
              <VscChromeClose
                className="max-sm:text-lg max-md:text-2xl max-lg:text-3xl"
                onClick={() => setHamburgerMenu(!hamburgerMenu)}
              />
            </div>
            <ul className="h-screen flex flex-col items-center max-md:text-base text-xl justify-center mt-2">
              <Link href="/film">
                <li className="border-2 py-1 px-8 mb-3 rounded-2xl">Movies</li>
              </Link>
              <Link href="/series">
                <li className="border-2 py-1 px-9 mb-3 rounded-2xl">Series</li>
              </Link>
              <Link href="/bests">
                <li className="border-2 py-1 px-10 mb-3 rounded-2xl">Bests</li>
              </Link>
              <Link href="/categories">
                <li className="border-2 py-1 px-4 mb-3 rounded-2xl">
                  Categories
                </li>
              </Link>
              <Link href="/platform">
                <li className="border-2 py-1 px-7 mb-3 rounded-2xl">
                  Platform
                </li>
              </Link>
            </ul>
          </main>
        </section>
      )}
    </div>
  );
};

export default Navbar;
