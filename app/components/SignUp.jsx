"use client";
import React from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState, useContext } from "react";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
  return (
    <div className="w-full h-screen">
      <form
        action=""
        className="flex flex-col items-center justify-center gap-4"
      >
        <input
          placeholder="Email"
          type="text"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </form>
    </div>
  );
};
export default SignUp;
