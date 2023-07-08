import React from "react";
import { BsSearch } from "react-icons/bs";
export const Tiny = () => {
  return (
    <div className="w-full h-10 flex flex-row items-center justify-center">
      <BsSearch className="text-2xl" />
      <input
        type="text"
        className="max-sm:w-40 ml-2 bg-transparent border-2 border-white rounded-md"
        name="search"
      />
    </div>
  );
};
