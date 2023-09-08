"use client";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, onSnapshot } from "../../../shared/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import Link from "next/link";
import Navbar from "../../components/Navbar";

function Profile() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [status, setStatus] = useState(true);

  useEffect(() => {
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
  }, [user]);

  return user ? (
    <section className="w-full mx-auto min-h-[100vh]">
      <Navbar />
      <main className="w-full bg-[#6600CC] mt-[68px] rounded-md">
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
      <main className="mt-4">
        <h1 className="w-11/12 mx-auto text-3xl text-left">List</h1>
        <div className="grid grid-cols-5 max-[1364px]:grid-cols-3 max-[1650px]:grid-cols-4   max-[1100px]:grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-2 justify-items-center mt-5">
          {list?.map((items, index) => {
            return (
              <Link href={`/bests/${items.title}`} key={index}>
                <div className="border  rounded-sm p-2 my-10 shadow-md shadow-slate-600">
                  <div
                    style={{ backgroundImage: `url("${items.posterUrl}")` }}
                    className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-sm hover:scale-105 transition-all duration-700 ease-in-out"
                  ></div>
                  <h1 className="text-left mt-2 text-white font-extrabold">
                    {items.title.substring(0, 13)}
                  </h1>
                  <h1 className="text-left ">{items.year}</h1>
                  <h1 className="text-left block max-md:hidden">
                    {items.genres
                      .toString()
                      .replace(/([A-Z])/g, " $1")
                      .trim()}
                  </h1>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
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
