"use client";
import { useState, useEffect, useContext } from "react";
import { MainContext } from "/app/components/Context";
import Footer from "/app/components/Footer";
import Navbar from "/app/components/Navbar";
import { useAuthState } from "react-firebase-hooks/auth";
import SignIn from "../../../components/SignIn";
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
import { db, onSnapshot, auth } from "../../../../shared/firebase";

export default function Page({ params }) {
  const { merge, setMerge, combined, posts, series } = useContext(MainContext);
  const [detail, setDetail] = useState(combined);
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [documentId, setDocumentId] = useState();
  const [displayAddRemove, setDisplayAddRemove] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = collection(db, "users");
        const userQuery = query(userRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(userQuery);

        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].id;
          setDocumentId(data);
        }

        const filteredBests = combined.filter((items) =>
          items.title.includes(
            `${params.bestsId
              .replace(/%20/g, " ")
              .replace(/%3A/g, ":")
              .replace(/%26/g, "&")}`
          )
        );
        setDetail(filteredBests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (user && params.bestsId) {
      fetchData();
    }
  }, [combined, params.bestsId, documentId]);

  useEffect(() => {
    if (!user || !documentId) {
      return;
    }

    const userDocRef = doc(db, "users", documentId);

    const fetchData = async () => {
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

    fetchData();
  }, [user, documentId, detail]);

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

  return user ? (
    <section>
      <Navbar />
      <main className="w-full min-h-[calc(100vh-10rem)] mx-auto flex flex-col text-2xl bg-gray-800 text-white">
        {detail.map((items, index) => {
          const AddItemToList = async (itemId) => {
            const userId = documentId; // Replace with the actual user ID
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
            }
          };
          return (
            <div key={items.id} className="p-4 bg-gray-800">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3">
                  <img
                    src={items.posterUrl}
                    alt={items.title}
                    className="w-9/12 mx-auto h-auto rounded-lg "
                  />
                </div>
                <div className="md:w-2/3 md:pl-4">
                  <h1 className="text-3xl font-bold">
                    {items.title} ({items.year})
                  </h1>
                  <div className="text-lg text-gray-400">
                    <p>Genres: {items.genres.join(", ")}</p>
                    <p>Runtime: {items.runtime} minutes</p>
                  </div>
                  <p className="text-lg">Actors: {items.actors}</p>
                  <p className="text-lg">Director: {items.director}</p>
                  <p className="text-lg">Plot: {items.plot}</p>
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
