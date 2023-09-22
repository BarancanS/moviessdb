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
    <div class="bg-white p-8 rounded-lg shadow-md max-[295px]:w-60 max-[380px]:w-72 w-96">
      <h1 class="text-2xl font-semibold text-center mb-6">Login</h1>
      <form>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div class="mb-4">
          <label for="password" class="block text-gray-700 font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div class="mb-6">
          <label class="inline-flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="mr-2"
            />
            <span class="ml-2 text-gray-700">Remember me</span>
          </label>
        </div>
        <button
          onClick={handleLogin}
          type="button"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        >
          Login
        </button>
        <button
          type="button"
          onClick={signInWithGoogle}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-bold flex items-center justify-center mt-2"
        >
          <FcGoogle className="text-xl mr-2" />
          Login with Google
        </button>
      </form>
      <div class="text-center mt-4">
        <button
          onClick={() => sendPasswordReset(email)}
          class="text-blue-500 hover:underline"
        >
          Forgot Password?
        </button>
      </div>
    </div>
  );
}

export default SignIn;
