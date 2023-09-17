"use client";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "../components/Context";

const Filter = () => {
  const { movies, setMovies } = useContext(MainContext);
  const [filteredMovies, setFilteredMovies] = useState([]);

  function FilterNetflixButtonClick() {
    setFilteredMovies(
      movies.filter((items) => items.platform.includes("Netflix"))
    );
  }
  function FilterAmazonButtonClick() {
    setFilteredMovies(
      movies.filter((items) => items.platform.includes("Amazon"))
    );
  }
  function ClearFilterButtonClick() {
    setFilteredMovies(movies);
  }
  return (
    <div className="flex flex-col">
      <button onClick={FilterNetflixButtonClick}>Netflix</button>
      <button onClick={FilterAmazonButtonClick}>Amazon</button>
      <button onClick={ClearFilterButtonClick}>Clear</button>
      <div>
        <ul>
          <li>
            {filteredMovies.map((items, index) => {
              return (
                <div key={index}>
                  <p>{items.title}</p>
                </div>
              );
            })}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Filter;
