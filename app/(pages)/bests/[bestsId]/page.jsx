"use client";
import { useSession } from "next-auth/react";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "/app/components/Context";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";

export default function Page({ params }) {
  const { merge, setMerge, combined, posts, series } = useContext(MainContext);
  const [detail, setDetail] = useState(combined);

  useEffect(() => {
    setDetail(
      combined.filter((items) =>
        items.title.includes(`${params.bestsId.replace(/%20/g, " ")}`)
      )
    );
  }, [combined]);

  return (
    <section>
      <Navbar />
      <main className="text-white text-2xl">
        My Post: {params.bestsId.replace(/%20/g, " ")}
        <div>
          {detail.map((items, index) => {
            return (
              <div
                key={index}
                className="border  rounded-2xl p-2 my-10 shadow-lg shadow-slate-500"
              >
                <div
                  style={{
                    backgroundImage: `url("${items.posterUrl}")`,
                  }}
                  className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
                ></div>
                <h1 className="text-left mt-2 text-white font-extrabold">
                  {items.title.substring(0, 13)}
                </h1>
                <h1 className="text-left ">{items.year}</h1>
                <h1 className="text-left block max-md:hidden">
                  {items.genres}
                </h1>
              </div>
            );
          })}
        </div>
      </main>
      <Footer />
    </section>
  );
}
