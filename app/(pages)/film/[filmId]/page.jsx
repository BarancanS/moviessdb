"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "/app/components/Context";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";

export default function Page({ params }) {
  const { merge, setMerge, combined, posts, series } = useContext(MainContext);
  const [detail, setDetail] = useState(posts);

  useEffect(() => {
    setDetail(
      posts.filter((items) =>
        items.title.includes(
          `${params.filmId.replace(/%20/g, " ").replace(/%3A/g, ":")}`
        )
      )
    );
  }, [posts]);

  return (
    <section>
      <Navbar />
      <main className="w-full min-h-[calc(100vh-10rem)] mx-auto flex flex-col text-white text-2xl">
        {detail.map((items, index) => {
          return (
            <div
              key={index}
              className="bg-[length:1920px_700px] bg-no-repeat bg-center border mx-auto  w-full h-[50vh] shadow-md shadow-slate-500"
              style={{
                backgroundImage: `url("${items.posterUrl}")`,
              }}
            >
              <div className="bg-black/[.66] w-full h-[50vh] p-2">
                <div className="w-7/12 h-full mx-auto flex flex-row items-center gap-10">
                  <div
                    style={{
                      backgroundImage: `url("${items.posterUrl}")`,
                    }}
                    className="max-sm:w-28 max-sm:h-40 w-72 h-96 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                  ></div>
                  <div className="w-5/12">
                    <div className="flex flex-row">
                      <h1 className="text-left mt-2 text-white font-extrabold">
                        {items.title.substring(0, 13)}
                      </h1>
                      <h1 className="text-left mt-2 text-white">
                        ({items.year})
                      </h1>
                    </div>
                    <div className="flex flex-row gap-2">
                      <h1 className="text-left block max-md:hidden text-sm font-light">
                        {items.genres
                          .toString()
                          .replace(/([A-Z])/g, " $1")
                          .trim()}
                      </h1>
                      <h1 className="text-left block max-md:hidden text-sm font-light">
                        -{items.platform}
                      </h1>
                      <h1 className="text-left block max-md:hidden text-sm font-light">
                        -{items.runtime}minute
                      </h1>
                    </div>
                    <h1 className="text-left block max-md:hidden text-sm font-light">
                      Actors:{items.actors}
                    </h1>
                    <h1 className="text-left block max-md:hidden text-sm font-light">
                      Director:{items.director}
                    </h1>
                    <h1 className="text-left block max-md:hidden text-sm font-light">
                      Plot:{items.plot}
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
  );
}
