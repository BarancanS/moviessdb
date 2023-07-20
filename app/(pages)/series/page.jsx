"use client";
import SignIn from "/app/components/SignIn";
import { useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "/app/components/Context";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";
import { SearchSeries } from "/app/components/SearchSeries";

const Series = () => {
  const { series } = useContext(MainContext);
  const session = useSession();
  const [authSession, setAuthSession] = useState();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      setAuthSession(false);
    } else {
      setAuthSession(true);
    }
  }, [session]);
  return authSession ? (
    <div>
      <Navbar />
      <SearchSeries />
      <div className="w-9/12 min-h-[calc(100vh-15rem)] mx-auto">
        <div className="grid grid-cols-5  max-2xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-1 justify-items-center mt-10">
          {series.map((items, index) => {
            return (
              <div key={index}>
                <div
                  style={{ backgroundImage: `url("${items.imageUrl}")` }}
                  className="max-sm:w-32 max-sm:h-44 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                ></div>
                <h1 className="text-center mt-10">{items.title}</h1>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <main className="w-full min-h-[calc(100vh-10rem)] flex items-center justify-center">
      <SignIn />
    </main>
  );
};

export default Series;
