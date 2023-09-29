"use client";
import { createContext, useState, useEffect, useContext } from "react";
const Main = createContext();
const MainContext = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const combined = movies.concat(series);
  const [merge, setMerge] = useState(combined);
  const [increasePage, setIncreasePage] = useState(1);

  const getPost = async () => {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=d760df5f0ef5e7c8ef5b52b71da88ce8&page=${increasePage}&sort_by=popularity.desc&vote_count.gte=200`
    )
      .then((response) => response.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getSeries = async () => {
    return fetch(
      `https://api.themoviedb.org/3/discover/tv?api_key=d760df5f0ef5e7c8ef5b52b71da88ce8&page=${increasePage}&sort_by=popularity.desc&vote_count.gte=200`
    )
      .then((response) => response.json())
      .then((data) => {
        setSeries(data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getPost();
  }, [increasePage]);

  useEffect(() => {
    getSeries();
  }, [increasePage]);

  const data = {
    movies,
    setMovies,
    series,
    setSeries,
    merge,
    setMerge,
    combined,
    increasePage,
    setIncreasePage,
  };
  return <Main.Provider value={data}>{children}</Main.Provider>;
};

export default MainContext;
export const MainState = () => {
  return useContext(Main);
};
