"use client";
import SignIn from "/app/components/SignIn";
import { useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";

const page = () => {
  const session = useSession();
  const [authSession, setAuthSession] = useState();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      setAuthSession(false);
    } else {
      setAuthSession(true);
    }
  });
  return authSession ? (
    <>
      <Navbar />
      <div className="w-full min-h-[calc(100vh-10rem)] flex flex-col items-center justify-center">
        <h1>Categories</h1>
      </div>
      <Footer />
    </>
  ) : (
    <main className="w-full min-h-[calc(100vh-10rem)] flex items-center justify-center">
      <SignIn />
    </main>
  );
};

export default page;
