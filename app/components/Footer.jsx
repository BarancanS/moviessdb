import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="h-20 w-10/12 mx-auto flex flex-row justify-between items-center">
      <h1 className="text-2xl max-sm:text-base">MovieDB</h1>
      <ul className="flex flex-row gap-5 text-lg max-sm:gap-1 max-sm:text-sm ml-3">
        <Link href="/movies">
          <li>Movies</li>
        </Link>
        <Link href="/series">
          <li>Series</li>
        </Link>

        <Link href="/bests">
          <li>Bests</li>
        </Link>
      </ul>
    </footer>
  );
};

export default Footer;
