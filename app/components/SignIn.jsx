"use client";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { initFirebase } from "../../shared/FirebaseConfig";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const SignIn = () => {
  initFirebase();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result);
  };
  const [user, loading] = useAuthState(auth);
  return user ? (
    <div className="flex flex-row max-lg:flex-col-reverse justify-center items-center gap-3">
      <button
        onClick={() => signOut(auth)}
        className="bg-red-600 h-10 rounded-xl p-2 flex flex-row items-center justify-center cursor-pointer"
      >
        Sign Out
      </button>
      <img
        src={user.photoURL}
        alt="user-image"
        className="rounded-full w-[4rem] h-[4rem]"
      />
    </div>
  ) : (
    <div className="flex flex-col items-center w-full h-screen justify-center gap-4">
      <div>
        <button
          onClick={signIn}
          className="bg-white w-26 rounded-xl p-2 flex flex-row items-center justify-center cursor-pointer"
        >
          <FcGoogle className="text-2xl" />
          <h1 className="text-black ml-2 font-medium">SignIn</h1>
        </button>
      </div>
    </div>
  );
};

export default SignIn;
