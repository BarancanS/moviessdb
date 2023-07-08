import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <footer className="h-20 w-10/12 mx-auto flex flex-row justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl">BaranFlix</h1>
      </Link>
      <ul className="flex flex-row gap-5 text-lg">
        <li>Kategoriler</li>
        <li>Film</li>
        <li>Dizi</li>
      </ul>
    </footer>
  );
};

export default Footer;
