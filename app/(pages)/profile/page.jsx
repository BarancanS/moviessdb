"use client";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db, logout } from "../../../shared/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
import SignIn from "../../components/SignIn";
import SignUp from "../../components/SignUp";
import Link from "next/link";
import Navbar from "../../components/Navbar";
function Profile() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const [list, setList] = useState();
  const [status, setStatus] = useState(true);
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setList(data.List);
      setName(data.name);
      console.log(data.List);
    } catch (err) {
      console.error(err);
      //   alert("An error occured while fetching user data");
    }
  };
  useEffect(() => {
    fetchUserName();
  }, [user, loading]);

  return user ? (
    <section className="w-full p-2 mx-auto min-h-[100vh]">
      <Navbar />
      <main className="h-20 w-10/12 mx-auto flex flex-row justify-between items-center">
        <h1 className="text-3xl">{user.displayName}'s List</h1>
        <div className="flex flex-row justify-center items-center gap-5 max-lg:hidden">
          <ul className="flex flex-row justify-center items-center gap-5 max-lg:hidden">
            <div>
              <li>Name : {user.displayName}</li>
            </div>
            <div>
              <li>Email : {user?.email}</li>
            </div>
          </ul>
        </div>
      </main>
      <main className=" ">
        <h1 className="w-11/12 mx-auto text-3xl text-left">List</h1>
        <div className="grid grid-cols-5 max-[1364px]:grid-cols-3 max-[1650px]:grid-cols-4   max-[1100px]:grid-cols-2 max-lg:grid-cols-2 max-md:grid-cols-2 max-sm:grid-cols-2 justify-items-center mt-5">
          {list?.map((items, index) => {
            return (
              <Link href={`/bests/${items.title}`} key={index}>
                <div className="border  rounded-2xl p-2 my-10 shadow-lg shadow-slate-500">
                  <div
                    style={{ backgroundImage: `url("${items.posterUrl}")` }}
                    className="max-sm:w-28 max-sm:h-40 w-60 h-80 bg-cover bg-no-repeat bg-center rounded-xl hover:scale-105 transition-all duration-700 ease-in-out"
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
