"use client";
import Head from "next/head"; // Import Head component for setting page titles and meta tags
import { useState } from "react";
import Movies from "./components/Movies";
import Series from "./components/Series";
import TrendingAll from "./components/TrendingAll";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import Carousel from "./components/Carousel";
import Auth from "./components/Auth";

export default function Home() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [status, setStatus] = useState(true);

  const handleStatusChange = () => {
    setStatus(!status);
  };

  return (
    <div>
      {loading ? (
        <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0C0C0C]">
          <Image
            src={`/loader1.gif`}
            width={50}
            height={50}
            alt="Loading GIF Alt Text"
            className="w-5/12 mx-auto h-auto rounded-lg"
          />
        </div>
      ) : (
        <div>
          {user ? (
            <main className="min-h-[calc(100vh-10rem)] w-full mx-auto">
              <Navbar />
              <div className="lg:px-20 max-lg:mt-16 mt-24">
                <Carousel />
                <Movies />
                <Series />
                <TrendingAll />
                <Footer />
              </div>
            </main>
          ) : (
            <div
              className="w-full flex flex-col items-center justify-center h-screen bg-cover bg-center"
              style={{
                backgroundImage: `url("${`/pexels-piccinng-3075993.jpg`}")`,
              }}
            >
              <Auth />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
