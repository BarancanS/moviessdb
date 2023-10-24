"use client";
import { useState, useEffect } from "react";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import Auth from "../../../components/Auth";

import { getAuth } from "firebase/auth";
import {
  doc,
  updateDoc,
  getDoc,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../../../../shared/firebase";
import { motion } from "framer-motion";

export default function Page({ params }) {
  const [detail, setDetail] = useState([]);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [documentId, setDocumentId] = useState("");
  const [displayAddRemove, setDisplayAddRemove] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [status, setStatus] = useState(true);
  const fetchSeriesDetail = async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/tv/${params.seriesId}?api_key=d760df5f0ef5e7c8ef5b52b71da88ce8`
      );
      const data = await response.json();
      setDetail([data]);
    } catch (err) {
      console.log(err);
    }
  };

  const handleStatusChange = () => {
    setStatus(!status);
  };
  useEffect(() => {
    if (user && params.seriesId) {
      const fetchDocumentIdData = async () => {
        try {
          const userRef = collection(db, "users");
          const userQuery = query(userRef, where("uid", "==", user.uid));
          const querySnapshot = await getDocs(userQuery);

          if (!querySnapshot.empty) {
            const data = querySnapshot.docs[0].id;
            setDocumentId(data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchDocumentIdData();
    }
    fetchSeriesDetail();
  }, [params.seriesId, documentId, user]);
  useEffect(() => {
    if (!user || !documentId) {
      return;
    }

    const userDocRef = doc(db, "users", documentId);

    const fetchListData = async () => {
      try {
        const userDoc = await getDoc(userDocRef);
        const userDocData = userDoc.data();
        if (userDocData && userDocData.List) {
          const userItemListIds = userDocData.List.map((item) => item.id);
          const updatedDisplayAddRemove = detail.map((item) => ({
            id: item.id,
            display: userItemListIds.includes(item.id),
          }));
          setDisplayAddRemove(updatedDisplayAddRemove);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchListData();
  }, [user, documentId, detail]);

  useEffect(() => {
    // Delay the button display for 0.7 seconds after component mounts
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 700);

    return () => {
      // Clear the timer if the component unmounts before 0.7 seconds
      clearTimeout(timer);
    };
  }, []);

  const handleAddRemove = async (itemId) => {
    const userId = documentId;
    const userDocRef = doc(db, "users", userId);

    try {
      const userDoc = await getDoc(userDocRef);
      const List = userDoc.data().List || [];

      const isDataAlreadyInList = List.some((item) => item.id === itemId);

      if (isDataAlreadyInList) {
        const updatedUserData = List.filter((item) => item.id !== itemId);
        await updateDoc(userDocRef, { List: updatedUserData });
        console.log("Document successfully updated! (Deleted)");
      } else {
        const itemToAdd = detail.find((item) => item.id === itemId);
        if (itemToAdd) {
          const updatedUserData = [...List, itemToAdd];
          await updateDoc(userDocRef, { List: updatedUserData });
          console.log("Document successfully updated! (Added)");
        }
      }

      // Update the displayAddRemove state after the add/remove operation
      const updatedDisplayAddRemove = displayAddRemove.map((item) =>
        item.id === itemId ? { ...item, display: !isDataAlreadyInList } : item
      );
      setDisplayAddRemove(updatedDisplayAddRemove);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0C0C0C]">
        <Image
          src={`/loader1.gif`}
          width={500}
          height={500}
          alt="loading gif"
          className="w-5/12 mx-auto h-auto rounded-lg"
          priority={true}
        />
      </div>
    );
  }

  return user ? (
    <section>
      <Navbar />
      <main className="w-full min-h-[calc(100vh-11rem)] mx-auto flex flex-col text-2xl bg-gray-800 text-white max-lg:mt-16 mt-24">
        {detail.map((items, index) => {
          return (
            <div key={index} className="p-4 bg-gray-800">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }} // Adjust the duration as needed
                  >
                    <Image
                      src={`https://image.tmdb.org/t/p/original${items.poster_path}`}
                      width={500}
                      height={500}
                      alt={items.name}
                      className="w-9/12 mx-auto h-auto rounded-lg "
                    />
                  </motion.div>
                </div>
                <div className="md:w-2/3 md:pl-4">
                  <h1 className="text-3xl font-bold">
                    {items.name} ({items.first_air_date})
                  </h1>
                  <div className="text-lg text-gray-400">
                    <p>Runtime: {items.episode_run_time.join(", ")} minutes</p>
                    <p className="text-lg">Tagline: {items.tagline}</p>
                  </div>
                  <p className="text-lg">Vote: {items.vote_count}</p>
                  <p className="text-lg">IMDB: {items.vote_average}</p>
                  <p className="text-lg">Plot: {items.overview}</p>

                  {/* Render the button only if showButton is true */}
                  {showButton && (
                    <button
                      onClick={() => handleAddRemove(items.id)}
                      className="mt-4 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300 ease-in-out"
                    >
                      {displayAddRemove.find(
                        (displayItem) => displayItem.id === items.id
                      )?.display
                        ? "Remove from List"
                        : "Add to List"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </main>
      <Footer />
    </section>
  ) : (
    <div
      className="w-full flex flex-col items-center justify-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url("${`/pexels-piccinng-3075993.jpg`}")`,
      }}
    >
      <Auth />
    </div>
  );
}
