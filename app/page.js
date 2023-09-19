"use client";
import SignIn from "../app/components/SignIn";
import SignUp from "./components/SignUp";
import { useState } from "react";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

export default function Home() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [status, setStatus] = useState(true);

  const handleStatusChange = () => {
    setStatus(!status);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <Image
          src={`/loader1.gif`}
          width={50}
          height={50}
          alt="loading gif"
          className="w-5/12 mx-auto h-auto rounded-lg"
        />
      </div>
    );
  }

  return user ? (
    <main className="min-h-[calc(100vh-10rem)] w-full mx-auto">
      <Navbar />
      <div className="lg:px-20">
        <video
          autoPlay
          loop
          muted
          src="/samurai-vs-assassin-battle-moonlit-night-moewalls-com.mp4"
          className="min-h-[calc(100vh-4rem)] object-center object-fill hover:opacity-80 opacity-40 transition-all duration-1000 ease-in-out"
        ></video>
        <Movies />
        <Series />
        <Footer />
      </div>
    </main>
  ) : (
    <div>
      {status ? (
        <div
          className="w-full flex flex-col items-center justify-center h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url("${`/pexels-james-wheeler-1519088.jpg`}")`,
          }}
        >
          <SignIn />
          <button
            onClick={handleStatusChange}
            className="bg-blue-500 hover:bg-blue-600 text-white mt-20 py-2 px-4 rounded-md font-bold flex items-center justify-center"
          >
            Register Page
          </button>
        </div>
      ) : (
        <div
          className="w-full flex flex-col items-center justify-center h-screen bg-cover bg-center"
          style={{
            backgroundImage: `url("${`/pexels-piccinng-3075993.jpg`}")`,
          }}
        >
          <SignUp />
          <button
            onClick={handleStatusChange}
            className="bg-blue-500 hover:bg-blue-600 text-white mt-20 py-2 px-4 rounded-md font-bold flex items-center justify-center"
          >
            Login Page
          </button>
        </div>
      )}
    </div>
  );
}
