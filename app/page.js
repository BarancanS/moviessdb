"use client";
import SignIn from "../app/components/SignIn";
import { useEffect, useState } from "react";
import Films from "./components/Films";
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
    <main className=" min-h-[calc(100vh-10rem)] 2xl:w-5/6 max-2xl:w-full  mx-auto">
      <Navbar />
      <div
        style={{ backgroundImage: "url(John-Wick.jpg)" }}
        className="min-h-[calc(100vh-6rem)]  hover:opacity-80 opacity-40 transition-all duration-1000 ease-in-out bg-cover bg-no-repeat bg-center"
      ></div>
      <Films />
      <Series />
      <Footer />
    </main>
  ) : (
    <div>
      {status ? (
        <div className="w-full flex flex-col items-center justify-center">
          <SignIn />
          <button
            onClick={() => setStatus(!status)}
            className="text-white font-medium bg-slate-600 w-56 h-10 rounded-xl p-2 flex flex-row items-center justify-center cursor-pointer"
          >
            Register Page
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
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
