"use client";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, onSnapshot } from "../../../shared/firebase";
import { query, collection, where } from "firebase/firestore";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/Navbar";

function Profile() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [status, setStatus] = useState(true);
  const [loadMore, setLoadMore] = useState(12);

  useEffect(() => {
    if (loading) {
      return; // Return early if loading
    }

    if (user && user.uid) {
      const userRef = collection(db, "users");
      const userQuery = query(userRef, where("uid", "==", user.uid));

      const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
        if (!querySnapshot.empty) {
          const data = querySnapshot.docs[0].data();
          setList(data.List);
          setName(data.name);
        }
      });

      return () => unsubscribe();
    }
  }, [user, loading]);

  return user ? (
    <section className="w-full pb-10 mx-auto min-h-[100vh]">
      <Navbar />
      <main className="w-full bg-[#6600CC] rounded-md">
        <div className="h-32 w-10/12 max-sm:w-full mx-auto flex flex-col justify-center max-sm:px-2 items-start">
          <h1 className="text-3xl text-white max-lg:text-2xl">
            {user.displayName}'s List
          </h1>
          <ul className="">
            <div>
              <li>
                <span className="text-[#FFCC00] font-bold text-xl max-lg:text-base max-sm:text-sm">
                  Name :
                </span>
                <span className="text-white font-bold text-xl max-lg:text-base max-sm:text-sm ">
                  {" "}
                  {user.displayName}
                </span>
              </li>
            </div>
            <div>
              <li>
                <span className="text-[#FFCC00] font-bold text-xl max-lg:text-base max-sm:text-sm">
                  Email :
                </span>
                <span className="text-white font-bold text-xl  max-lg:text-base max-sm:text-sm">
                  {" "}
                  {user?.email.slice(0, 30)}
                </span>
              </li>
            </div>
          </ul>
        </div>
      </main>
      <main className="mt-4">{/* Rest of your component code... */}</main>
    </section>
  ) : (
    <div>
      {status ? (
        <div className="w-full flex flex-col items-center justify-center">
          <SignIn />
          <button
            onClick={() => setStatus(!status)}
            className="text-white font-medium bg-slate-600 w-56 h-10 rounded-xl p-2 flex flex-row items-center justify-center cursor-pointer"
          >
            Register Page
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center">
          <SignUp />
          <button
            onClick={() => setStatus(!status)}
            className="text-white font-medium bg-slate-600 w-56 h-10 rounded-xl p-2 flex flex-row items-center justify-center cursor-pointer"
          >
            Login Page
          </button>
        </div>
      )}
    </div>
  );
}

export default Profile;
