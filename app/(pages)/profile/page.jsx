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

  // Create a separate function for the data retrieval logic
  const fetchData = async () => {
    if (!user || !user.uid) {
      return; // Return early if user is not available
    }

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
  };

  useEffect(() => {
    fetchData(); // Call the fetchData function unconditionally
  }, [user]);

  return loading ? (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-[#0C0C0C]">
      <Image
        src={`/loader1.gif`}
        width={500}
        height={500}
        alt="loading gif"
        className="w-5/12 mx-auto h-auto rounded-lg "
      />
    </div>
  ) : user ? (
    <section className="w-full pb-10 mx-auto min-h-[100vh] max-lg:mt-16 mt-24">
      <Navbar />
      <main className="w-full bg-[#6600CC]">
        <div className="h-32 w-10/12 max-sm:w-full mx-auto flex flex-col justify-center max-sm:px-2 items-start">
          {user.displayName && (
            <h1 className="text-3xl text-white max-lg:text-2xl">
              {user.displayName}'s List
            </h1>
          )}
          <ul className="">
            <div>
              <li>
                {user.displayName ? (
                  <span className="text-[#FFCC00] font-bold text-xl max-lg:text-base max-sm:text-sm">
                    Name :
                  </span>
                ) : (
                  <p>Welcome</p>
                )}
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
        <div className="grid grid-cols-2 max-[500px]:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 justify-items-center mt-10">
          {list?.slice(0, loadMore).map((items, index) => {
            const checkPage = items.name ? "series" : "movies";
            const checkType = items.name ? "Series" : "Movie";
            return (
              <Link href={`/${checkPage}/${items.id}`} key={index}>
                <div className="relative z-10 hover:scale-105 transition-all duration-300 ease-in-out">
                  <span
                    className={`${
                      items.name ? "bg-red-900" : "bg-yellow-500"
                    }  py-2 w-4/12 z-20 text-center max-md:text-sm max-sm:w-5/12 rounded-tl-sm rounded-br-2xl absolute top-0 left-0 text-white font-bold`}
                  >
                    {checkType}
                  </span>
                  <div
                    style={{
                      backgroundImage: `url("${`https://image.tmdb.org/t/p/original${items.poster_path}`}")`,
                    }}
                    className="rounded-lg p-2  shadow-xl hover:shadow-[10px_1px_50px_5px_rgba(0,0,0,0.3)] hover:shadow-fuchsia-800 shadow-fuchsia-950 hover:scale-105 transition-all duration-300 ease-in-out w-60 h-80 bg-cover bg-no-repeat bg-center"
                  ></div>
                  <h1 className="flex flex-row items-start justify-center w-60 h-20 mt-5 max-md:text-sm text-white font-extrabold overflow-hidden">
                    {items.name || items.title}
                  </h1>
                  <h1 className="text-left">{items.year}</h1>
                </div>
              </Link>
            );
          })}
        </div>
        <div className="w-full text-center">
          {loadMore >= list.length ? (
            <></>
          ) : (
            <button
              className="w-30 p-2 text-black font-semibold rounded-md bg-white"
              onClick={() => setLoadMore(loadMore + 12)}
            >
              Show More
            </button>
          )}
          {loadMore <= 12 ? (
            <></>
          ) : (
            <button
              className="w-30 ml-2 p-2 text-white font-semibold rounded-md bg-red-600"
              onClick={() => setLoadMore(loadMore > 12 && loadMore - 12)}
            >
              Show Less
            </button>
          )}
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
