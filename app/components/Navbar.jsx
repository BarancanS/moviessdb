"use client";
import React, { useEffect, useState } from "react";
import { FaHamburger } from "react-icons/fa";
import { VscChromeClose } from "react-icons/vsc";
import Link from "next/link";
import SignIn from "./SignIn";

const Navbar = () => {
  const [hamburgerMenu, setHamburgerMenu] = React.useState(false);
  const currentUrl = window.location.href;

  return (
    <div className="h-20 w-10/12 mx-auto flex flex-row justify-between items-center">
      <Link href="/" className="flex flex-row">
        <h1
          className={`text-3xl ${
            currentUrl === "http://localhost:3000/"
              ? "text-red-600"
              : "text-white"
          }`}
        >
          Baran
        </h1>
        <h1 className="text-3xl">Flix</h1>
      </Link>
      <div className="flex flex-row justify-center items-center gap-5 max-lg:hidden">
        <ul className="flex flex-row justify-center items-center gap-5 max-lg:hidden text-xl">
          <Link href="/film">
            <li
              className={`${
                currentUrl === "http://localhost:3000/film"
                  ? "text-red-600"
                  : "text-white"
              }`}
            >
              Film
            </li>
          </Link>
          <Link href="/series">
            <li
              className={`${
                currentUrl === "http://localhost:3000/series"
                  ? "text-red-600"
                  : "text-white"
              }`}
            >
              Series
            </li>
          </Link>
          <Link href="/bests">
            <li
              className={`${
                currentUrl === "http://localhost:3000/bests"
                  ? "text-red-600"
                  : "text-white"
              }`}
            >
              Bests
            </li>
          </Link>
          <Link href="/categories">
            <li
              className={`${
                currentUrl === "http://localhost:3000/categories"
                  ? "text-red-600"
                  : "text-white"
              }`}
            >
              Categories
            </li>
          </Link>
          <li>
            <SignIn />
          </li>
        </ul>
        {/* Burayi Image elementi ile değiştirmeyi unutma */}
      </div>
      <FaHamburger
        className="lg:hidden text-2xl"
        onClick={() => setHamburgerMenu(!hamburgerMenu)}
      />
      {hamburgerMenu && (
        <section className="lg:hidden block fixed z-10 top-0 left-0 npm w-5/6 bg-slate-900 rounded-r-xl">
          <main className="flex flex-col">
            <div className="flex w-11/12 mx-auto mt-2 flex-row justify-between">
              <Link
                href="/"
                className="flex flex-row"
                onClick={() => setHamburgerMenu(!hamburgerMenu)}
              >
                <h1
                  className={`max-sm:text-lg max-md:text-2xl max-lg:text-3xl ${
                    currentUrl === "http://localhost:3000/"
                      ? "text-red-600"
                      : "text-white"
                  }`}
                >
                  Baran
                </h1>
                <h1 className="max-sm:text-lg max-md:text-2xl max-lg:text-3xl">
                  Flix
                </h1>
              </Link>
              <VscChromeClose
                className="max-sm:text-lg max-md:text-2xl max-lg:text-3xl"
                onClick={() => setHamburgerMenu(!hamburgerMenu)}
              />
            </div>
            <div className="flex flex-col  items-center w-full gap-2 mt-2">
              <div className="flex items-center flex-col gap-2">
                <SignIn />
              </div>
            </div>
            <ul className="h-screen flex flex-col items-center max-md:text-base text-xl mt-20">
              <Link
                href="/film"
                className={`${
                  currentUrl === "http://localhost:3000/film"
                    ? "text-red-600"
                    : "text-white"
                }`}
              >
                <li className="border-b-2 py-1 px-8 mb-3 ">Movies</li>
              </Link>
              <Link
                href="/series"
                className={`${
                  currentUrl === "http://localhost:3000/series"
                    ? "text-red-600"
                    : "text-white"
                }`}
              >
                <li className="border-b-2 py-1 px-9 mb-3">Series</li>
              </Link>
              <Link
                href="/bests"
                className={`${
                  currentUrl === "http://localhost:3000/bests"
                    ? "text-red-600"
                    : "text-white"
                }`}
              >
                <li className="border-b-2 py-1 px-10 mb-3">Bests</li>
              </Link>
              <Link
                href="/categories"
                className={`${
                  currentUrl === "http://localhost:3000/categories"
                    ? "text-red-600"
                    : "text-white"
                }`}
              >
                <li className="border-b-2 py-1 px-4 mb-3">Categories</li>
              </Link>
            </ul>
          </main>
        </section>
      )}
    </div>
  );
};

export default Navbar;
