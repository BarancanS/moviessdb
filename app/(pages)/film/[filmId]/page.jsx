"use client";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "/app/components/Context";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../../../components/SignIn";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../../../shared/firebase";

export default function Page({ params }) {
  const { merge, setMerge, combined, posts, series } = useContext(MainContext);
  const [detail, setDetail] = useState(posts);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  useEffect(() => {
    setDetail(
      posts.filter((items) =>
        items.title.includes(
          `${params.filmId
            .replace(/%20/g, " ")
            .replace(/%3A/g, ":")
            .replace(/%26/g, "&")}`
        )
      )
    );
  }, [posts, params.filmId]);

  return user ? (
    <section>
      <Navbar />
      <main className="w-full min-h-[calc(100vh-10rem)] mx-auto flex flex-col text-white text-2xl">
        {detail.map((items, index) => {
          const AddItemToList = async (itemId) => {
            const userId = "WWVP8uzf1Gn7WC7vJsfL"; // Replace with the actual user ID
            const userDocRef = doc(db, "users", userId);

            try {
              // 2. Retrieve the current data
              const userDoc = await getDoc(userDocRef);
              const List = userDoc.data().List || []; // If 'List' doesn't exist yet, create an empty array

              // 3. Check if the data already exists in the List using the 'id'
              const isDataAlreadyInList = List.some(
                (item) => item.id === itemId
              );

              if (isDataAlreadyInList) {
                // Delete the data with the specified ID from the List
                const updatedUserData = List.filter(
                  (item) => item.id !== itemId
                );
                await updateDoc(userDocRef, { List: updatedUserData });
                console.log("Document successfully updated! (Deleted)");
              } else {
                // Add the data to the List
                const newData = {
                  id: items.id,
                  title: items.title,
                  year: items.year,
                  runtime: items.runtime,
                  genres: items.genres,
                  director: items.director,
                  actors: items.actors,
                  plot: items.plot,
                  posterUrl: items.posterUrl,
                };
                const updatedUserData = [...List, newData];
                await updateDoc(userDocRef, { List: updatedUserData });
                console.log("Document successfully updated! (Added)");
              }
            } catch (err) {
              console.error(err);
              alert("Failed to update document: " + err.message);
            }
          };
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
                    <button
                      onClick={() => AddItemToList(items.id)}
                      className="bg-red-600 rounded-xl mt-2 h-10 p-2 flex flex-row items-center justify-center cursor-pointer"
                    >
                      Add Movie
                    </button>
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
