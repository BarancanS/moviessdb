"use client";
import { useState, useEffect } from "react";
import React from "react";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import Login from "../../components/Login";
import Register from "../../components/Register";

const Platforms = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [status, setStatus] = useState(true);
  return user ? (
    <section>
      <Navbar />
      <div className="w-full min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center">
        <h1>Platform</h1>
      </div>
      <Footer />
    </section>
  ) : (
    <div>
      {status ? (
        <div className="w-full flex flex-col items-center justify-center">
          <SignIn />
          <button
            onClick={() => setStatus(!status)}
            className="bg-slate-600 w-56 h-10 rounded-xl p-2 flex flex-row items-center justify-center cursor-pointer"
          >
            {status ? (
              <div>
                <h1 className="text-white ml-2 font-medium">Register Page</h1>
              </div>
            ) : (
              <h1 className="text-white ml-2 font-medium">Login Page</h1>
            )}
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <SignUp />
          <button
            onClick={() => setStatus(!status)}
            className="bg-slate-600 w-56 h-10 rounded-xl p-2 flex flex-row items-center justify-center cursor-pointer"
          >
            {status ? (
              <div>
                <h1 className="text-white ml-2 font-medium">Register Page</h1>
              </div>
            ) : (
              <h1 className="text-white ml-2 font-medium">Login Page</h1>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default Platforms;
