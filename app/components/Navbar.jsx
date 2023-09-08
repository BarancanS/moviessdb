import React, { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import Link from "next/link";
import SignIn from "./SignIn";

const Navbar = () => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const currentUrl = window.location.href;

  return (
    <nav className="bg-black text-white p-4 fixed top-0 z-30 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <h1
            className={`text-3xl ${
              currentUrl === "https://baranflix.vercel.app/"
                ? "text-red-600"
                : "text-white"
            }`}
          >
            Baran
          </h1>
          <h1 className="text-3xl">Flix</h1>
        </Link>
        <div className="hidden lg:flex space-x-5 items-center justify-center text-xl">
          <Link
            href="/film"
            className={`${
              currentUrl === "https://baranflix.vercel.app/film"
                ? "text-red-600"
                : "text-white"
            } hover:text-red-600`}
          >
            Movies
          </Link>
          <Link
            href="/series"
            className={`${
              currentUrl === "https://baranflix.vercel.app/series"
                ? "text-red-600"
                : "text-white"
            } hover:text-red-600`}
          >
            Series
          </Link>
          <Link
            href="/bests"
            className={`${
              currentUrl === "https://baranflix.vercel.app/bests"
                ? "text-red-600"
                : "text-white"
            } hover:text-red-600`}
          >
            Bests
          </Link>
          <Link
            href="/categories"
            className={`${
              currentUrl === "https://baranflix.vercel.app/categories"
                ? "text-red-600"
                : "text-white"
            } hover:text-red-600`}
          >
            Categories
          </Link>
          <SignIn />
        </div>
        <FaHamburger
          className="lg:hidden text-2xl cursor-pointer"
          onClick={() => setHamburgerMenu(!hamburgerMenu)}
        />
      </div>
      {
        <div
          className={`lg:hidden fixed inset-0 bg-black max-lg:bg-opacity-80 z-30 py-4 top-[68px] left-0  ${
            hamburgerMenu ? "translate-x-0" : "translate-x-[-100%]"
          } transition-transform duration-500 ease-in-out`}
        >
          <div>
            <div className="flex flex-col-reverse p-4 justify-between items-center">
              <div className="flex flex-col items-center space-y-4 mt-4">
                <Link
                  href="/film"
                  className={`${
                    currentUrl === "https://baranflix.vercel.app/film"
                      ? "text-red-600"
                      : "text-white"
                  } hover:text-red-600`}
                  onClick={() => setHamburgerMenu(!hamburgerMenu)}
                >
                  Movies
                </Link>
                <Link
                  href="/series"
                  className={`${
                    currentUrl === "https://baranflix.vercel.app/series"
                      ? "text-red-600"
                      : "text-white"
                  } hover:text-red-600`}
                  onClick={() => setHamburgerMenu(!hamburgerMenu)}
                >
                  Series
                </Link>
                <Link
                  href="/bests"
                  className={`${
                    currentUrl === "https://baranflix.vercel.app/bests"
                      ? "text-red-600"
                      : "text-white"
                  } hover:text-red-600`}
                  onClick={() => setHamburgerMenu(!hamburgerMenu)}
                >
                  Bests
                </Link>
                <Link
                  href="/categories"
                  className={`${
                    currentUrl === "https://baranflix.vercel.app/categories"
                      ? "text-red-600"
                      : "text-white"
                  } hover:text-red-600`}
                  onClick={() => setHamburgerMenu(!hamburgerMenu)}
                >
                  Categories
                </Link>
              </div>
              <SignIn />
            </div>
          </div>
        </div>
      }
    </nav>
  );
};

export default Navbar;
