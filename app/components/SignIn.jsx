"use client";
import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

const SignIn = () => {
  const session = useSession();
  if (session.status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-3xl">Sign In For Continue</h1>
        <div
          onClick={() => signIn("google")}
          className="bg-white w-52 rounded-xl p-2 flex flex-row items-center justify-center cursor-pointer"
        >
          <FcGoogle className="text-2xl" />
          <h1 className="text-black ml-2 font-medium">SignIn With Google</h1>
        </div>
      </div>
    );
  }
  if (session.status === "authenticated") {
    return (
      <div
        onClick={() => signOut("google")}
        className="bg-red-600 rounded-xl p-2 flex flex-row items-center justify-center cursor-pointer"
      >
        Sign Out
      </div>
    );
  }
  return (
    <div>
      <h1>Sign In</h1>
    </div>
  );
};

export default SignIn;
