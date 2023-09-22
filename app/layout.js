"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { MainContext } from "../app/components/Context";
import { useState, useEffect } from "react";
import { app } from "../shared/firebase";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import "react-alice-carousel/lib/alice-carousel.css";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  const [movies, setMovies] = useState([]);
  const [series, setSeries] = useState([]);
  const combined = movies.concat(series);
  const [merge, setMerge] = useState(combined);
  const [increasePage, setIncreasePage] = useState(1);

  const getPost = async () => {
    return fetch(
      `https://api.themoviedb.org/3/discover/movie?api_key=d760df5f0ef5e7c8ef5b52b71da88ce8&page=${increasePage}`
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
      `https://api.themoviedb.org/3/discover/tv?api_key=d760df5f0ef5e7c8ef5b52b71da88ce8&page=${increasePage}`
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
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <MainContext.Provider value={data}>{children}</MainContext.Provider>
      </body>
    </html>
  );
}
