import React, { useState } from "react";
import { FaHamburger } from "react-icons/fa";
import Link from "next/link";
import Auth from "../components/Auth";

const Navbar = () => {
  const [hamburgerMenu, setHamburgerMenu] = useState(false);
  const currentUrl = window.location.href;

  return (
    <section className="lg:h-[96px] max-lg:h-[68px] fixed top-0 z-30 bg-black/[.80] w-full flex flex-col items-center justify-center">
      <nav className="text-white p-4 w-10/12 relative">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <h1
              className={`text-3xl ${
                currentUrl === "https://moviessdb.vercel.app/"
                  ? "text-red-600"
                  : "text-white"
              }`}
            >
              Movie
            </h1>
            <h1 className="text-3xl">DB</h1>
          </Link>
          <div className="hidden lg:flex space-x-5 items-center justify-center text-xl">
            <Link
              href="/movies"
              className={`${
                currentUrl === "https://moviessdb.vercel.app/movies"
                  ? "text-red-600"
                  : "text-white"
              } hover:text-red-600`}
            >
              Movies
            </Link>
            <Link
              href="/series"
              className={`${
                currentUrl === "https://moviessdb.vercel.app/series"
                  ? "text-red-600"
                  : "text-white"
              } hover:text-red-600`}
            >
              Series
            </Link>
            <Link
              href="/bests"
              className={`${
                currentUrl === "https://moviessdb.vercel.app/bests"
                  ? "text-red-600"
                  : "text-white"
              } hover:text-red-600`}
            >
              Bests
            </Link>
            <Link
              href="/categories"
              className={`${
                currentUrl === "https://moviessdb.vercel.app/categories"
                  ? "text-red-600"
                  : "text-white"
              } hover:text-red-600`}
            >
              Categories
            </Link>
            <Auth />
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
                    href="/movies"
                    className={`${
                      currentUrl === "https://moviessdb.vercel.app/movies"
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
                      currentUrl === "https://moviessdb.vercel.app/series"
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
                      currentUrl === "https://moviessdb.vercel.app/bests"
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
                      currentUrl === "https://moviessdb.vercel.app/categories"
                        ? "text-red-600"
                        : "text-white"
                    } hover:text-red-600`}
                    onClick={() => setHamburgerMenu(!hamburgerMenu)}
                  >
                    Categories
                  </Link>
                </div>
                <Auth />
              </div>
            </div>
          </div>
        }
      </nav>
    </section>
  );
};

export default Navbar;
