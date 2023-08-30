import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import {
  auth,
  logout,
  signInWithEmailAndPassword,
  signInWithGoogle,
} from "../../shared/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import Image from "next/image";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {}, [user, loading]);
  return user ? (
    <div className="flex flex-row item gap-2 items-center justify-center  max-lg:flex-col-reverse  ">
      <button
        className="bg-red-600 rounded-xl h-10 p-2 flex flex-row items-center justify-center cursor-pointer"
        onClick={logout}
      >
        Logout
      </button>
      <Link
        href="/profile"
        className="bg-red-600 rounded-xl h-10 p-2 flex flex-row items-center justify-center cursor-pointer"
      >
        Profile
      </Link>
      <Image
        src={user.photoURL}
        width={50}
        height={50}
        alt="user-image"
        className="rounded-full w-[4rem] h-[4rem]"
      />
    </div>
  ) : (
    <div className="w-full h-[50vh] flex flex-col items-center justify-center">
      <h1 className="text-white ml-2 font-medium text-3xl mb-2">Login</h1>
      <div className="flex flex-col items-center justify-center gap-2 p-2 border rounded-lg border-white border-double w-62">
        <input
          type="text"
          className="text-center text-black font-extrabold rounded-lg w-56 h-8"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="text-center text-black font-extrabold rounded-lg w-56 h-8"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button
          onClick={() => signInWithEmailAndPassword(email, password)}
          className="bg-slate-600 w-56 h-10 rounded-xl p-2 flex flex-row items-center justify-center cursor-pointer"
        >
          <AiOutlineMail className="text-2xl" />
          <h1 className="text-white ml-2 font-medium">Login with Email</h1>
        </button>
        <button
          onClick={signInWithGoogle}
          className="bg-slate-600 w-56 h-10 rounded-xl p-2 flex flex-row items-center justify-center cursor-pointer"
        >
          <FcGoogle className="text-2xl" />
          <h1 className="text-white ml-2 font-medium">Login with Google</h1>
        </button>
      </div>
    </div>
  );
}
export default SignIn;
