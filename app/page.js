"use client";
import SignIn from "../app/components/SignIn";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Films from "./components/Films";
import Series from "./components/Series";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function Home() {
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
    <main className=" min-h-[calc(100vh-10rem)] w-5/6 mx-auto">
      <Navbar />
      <div
        style={{ backgroundImage: "url(John-Wick.jpg)" }}
        className="min-h-[calc(100vh-6rem)]  hover:opacity-80 opacity-40 transition-all duration-1000 ease-in-out bg-cover bg-no-repeat bg-center"
      ></div>
      <Films />
      <Series />
      {/* <div className="flex flex-row">
        <div className="flex flex-col w-9/12">
          <Films />
          <Series />
        </div>
        <div className="w-3/12 max-xl:hidden mt-5 p-5 bg-red-900 rounded-xl">
          asd
        </div>
      </div> */}
      <Footer />
    </main>
  ) : (
    <main className=" min-h-[calc(100vh-10rem)] w-5/6 mx-auto flex items-center justify-center">
      <SignIn />
    </main>
  );
}
