import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import {
  auth,
  logout,
  signInWithEmailAndPassword,
  signInWithGoogle,
  logInWithEmailAndPassword,
  sendPasswordReset,
} from "../../shared/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie"; // Make sure to install js-cookie

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false); // Remember Me checkbox state
  const [user, loading, error] = useAuthState(auth);

  useEffect(() => {
    // Check if the user is remembered and automatically log them in
    const rememberedUser = Cookies.get("rememberedUser");
    if (rememberedUser === "true" && !user) {
      // Perform automatic login here
      // You can use the logInWithEmailAndPassword function here
      // Make sure to handle errors appropriately
      const rememberedEmail = Cookies.get("rememberedEmail");
      if (rememberedEmail) {
        setEmail(rememberedEmail);
        handleLogin();
      }
    }
  }, [user]);

  const handleLogin = async () => {
    try {
      await logInWithEmailAndPassword(email, password);
      if (rememberMe) {
        Cookies.set("rememberedUser", "true", { expires: 365 }); // Remember the user for 1 year
        Cookies.set("rememberedEmail", email, { expires: 365 });
      } else {
        Cookies.remove("rememberedUser");
        Cookies.remove("rememberedEmail");
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
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
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-white text-3xl font-bold mb-4">Login</h1>
      <div className="bg-white rounded-lg max-sm:w-52 p-6 shadow-md w-96">
        <input
          type="text"
          className="w-full py-2 px-3 mb-4 rounded-md border border-gray-300"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <input
          type="password"
          className="w-full py-2 px-3 mb-4 rounded-md border border-gray-300"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <div className="mb-4">
          <label htmlFor="rememberMe" className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            Remember Me
          </label>
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-bold flex items-center justify-center"
        >
          <AiOutlineMail className="text-xl mr-2" />
          Login with Email
        </button>
        <button
          onClick={signInWithGoogle}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-bold flex items-center justify-center mt-2"
        >
          <FcGoogle className="text-xl mr-2" />
          Login with Google
        </button>
        <button
          onClick={() => sendPasswordReset(email)}
          className="text-blue-500 hover:underline mt-2 cursor-pointer"
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
}

export default SignIn;
