"use client";
import Provider from "./components/Provider";
import "./globals.css";
import { Inter } from "next/font/google";
import { MainContext } from "../app/components/Context";
import { useState, useEffect } from "react";
import app from "../shared/FirebaseConfig";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({ children }) {
  const [posts, setPosts] = useState([]);
  const [series, setSeries] = useState([]);
  const combined = posts.concat(series);
  const [merge, setMerge] = useState(combined);

  useEffect(() => {
    getPost();
    getSeries();
  }, []);

  const getPost = async () => {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
      setPosts((posts) => [...posts, doc.data()]);
    });
  };
  const getSeries = async () => {
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "series"));
    querySnapshot.forEach((doc) => {
      setSeries((series) => [...series, doc.data()]);
    });
  };

  const data = {
    posts,
    setPosts,
    series,
    setSeries,
    merge,
    setMerge,
    combined,
  };
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Provider>
          <MainContext.Provider value={data}>{children}</MainContext.Provider>
        </Provider>
      </body>
    </html>
  );
}
