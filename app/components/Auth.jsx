import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import {
  auth,
  logout,
  registerWithEmailAndPassword,
  signInWithGoogle,
  logInWithEmailAndPassword,
} from "../../shared/firebase";
import Link from "next/link";
import Image from "next/image";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const [isNewUser, setIsNewUser] = useState(true);

  const switchAuthMode = () => {
    setIsNewUser((prevMode) => !prevMode);
  };

  const authAction = isNewUser
    ? registerWithEmailAndPassword
    : logInWithEmailAndPassword;

  const handleAuth = () => {
    if (isNewUser && !name) {
      alert("Please enter your name.");
    } else {
      authAction(name, email, password);
    }
  };

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
        className="bg-red-600 rounded-xl h-10 p-2 flex flex-row items- center justify-center cursor-pointer"
      >
        Profile
      </Link>
      {user.photoURL && (
        <Image
          src={user.photoURL || ""}
          width={50}
          height={50}
          alt="user-image"
          className="rounded-full w-[4rem] h-[4rem]"
        />
      )}
    </div>
  ) : (
    <div className="bg-white p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl font-semibold text-center mb-6">
        {isNewUser ? "Register" : "Login"}
      </h1>
      <form>
        {isNewUser && (
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
              placeholder="Your Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 font-semibold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {isNewUser && (
          <div className="mb-6">
            <label className="inline-flex items-center">
              <input type="checkbox" className="form-checkbox text-blue-400" />
              <span className="ml-2 text-gray-700">
                I agree to the terms and conditions
              </span>
            </label>
          </div>
        )}
        <button
          type="button"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          onClick={handleAuth}
        >
          {isNewUser ? "Register" : "Login"}
        </button>
        <button
          type="button"
          onClick={signInWithGoogle}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-bold flex items-center justify-center mt-2"
        >
          <span className="text-xl mr-2">
            <FcGoogle />
          </span>
          {isNewUser ? "Register With Google" : "Login With Google"}
        </button>
      </form>
      <div className="text-center mt-4">
        <p className="text-gray-600">
          {isNewUser ? "Already have an account?" : "Don't have an account?"}
          <button
            onClick={switchAuthMode}
            className="text-blue-500 hover:underline ml-2"
          >
            {isNewUser ? "Login" : "Register"}
          </button>
        </p>
      </div>
    </div>
  );
}

export default Auth;
