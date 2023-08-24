"use client";
import { useState, useEffect } from "react";
import React from "react";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";

const Platforms = () => {
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  return user ? (
    <section>
      <Navbar />
      <div className="w-full min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center">
        <h1>Platform</h1>
      </div>
      <Footer />
    </section>
  ) : (
    <SignIn />
  );
};

export default Platforms;
