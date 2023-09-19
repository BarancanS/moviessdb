"use client";
import SignIn from "../app/components/SignIn";
import SignUp from "./components/SignUp";
import { useEffect, useState } from "react";
import Movies from "./components/Movies";
import Series from "./components/Series";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [status, setStatus] = useState(true);
  return user ? (
    <main className=" min-h-[calc(100vh-10rem)] w-full  mx-auto">
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
            onClick={() => setStatus(!status)}
            className="text-white font-medium bg-slate-600 w-56 h-10 rounded-xl p-2 flex flex-row items-center justify-center cursor-pointer"
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
            onClick={() => setStatus(!status)}
            className="text-white font-medium bg-slate-600 w-56 h-10 rounded-xl p-2 flex flex-row items-center justify-center cursor-pointer"
          >
            Login Page
          </button>
        </div>
      )}
    </div>
  );
}
