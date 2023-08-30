"use client";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "/app/components/Context";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../../../components/SignIn";

export default function Page({ params }) {
  const { merge, setMerge, combined, posts, series } = useContext(MainContext);
  const [detail, setDetail] = useState(combined);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    setDetail(
      combined.filter((items) =>
        items.title.includes(
          `${params.bestsId
            .replace(/%20/g, " ")
            .replace(/%3A/g, ":")
            .replace(/%26/g, "&")}`
        )
      )
    );
  }, [combined, params.bestsId]);

  return user ? (
    <section>
      <Navbar />
      <main className="w-full min-h-[calc(100vh-10rem)] mx-auto flex flex-col text-white text-2xl">
        {detail.map((items, index) => {
          return (
            <div
              key={index}
              className="bg-[length:1920px_700px] bg-no-repeat bg-center border w-full  min-h-[50vh] shadow-md shadow-slate-500"
              style={{
                backgroundImage: `url("${items.posterUrl}")`,
              }}
            >
              <div className="bg-black/[.66] w-full min-h-[50vh] px-2 py-4">
                <div className="w-full min-h-[50vh] max-md:flex-col flex flex-row justify-center items-center gap-10">
                  <div
                    style={{
                      backgroundImage: `url("${items.posterUrl}")`,
                    }}
                    className="max-sm:w-36 max-sm:h-52 max-md:w-44 max-md:h-60 max-lg:w-56 max-lg:h-72 w-72 h-96 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                  ></div>
                  <div className="w-5/12 max-md:w-11/12">
                    <div className="flex flex-row">
                      <h1 className="text-left mt-2 text-white font-extrabold">
                        {items.title.substring(0, 13)}
                      </h1>
                      <h1 className="text-left mt-2 text-white">
                        ({items.year})
                      </h1>
                    </div>
                    <div className="flex flex-row gap-2">
                      <h1 className="text-sm font-light">
                        {items.genres
                          .toString()
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
                      </h1>
                      <h1 className="text-sm font-light">
                        -{items.runtime}minute
                      </h1>
                    </div>
                    <h1 className="text-sm font-light">
                      <span className="font-bold text-red-700 text-base">
                        Platform:
                      </span>
                      {items.platform}
                    </h1>
                    <h1 className="text-sm font-light">
                      <span className="font-bold text-red-700 text-base">
                        Actors:
                      </span>
                      {items.actors}
                    </h1>
                    <h1 className="text-sm font-light">
                      <span className="font-bold text-red-700 text-base">
                        Director:
                      </span>
                      {items.director}
                    </h1>
                    <h1 className="text-sm font-light">
                      <span className="font-bold text-red-700 text-base">
                        Plot:
                      </span>
                      {items.plot}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </main>
      <Footer />
    </section>
  ) : (
    <SignIn />
  );
}
