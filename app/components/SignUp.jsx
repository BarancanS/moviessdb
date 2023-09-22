import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../shared/firebase";
function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);

  const register = () => {
    if (!name) alert("Please enter name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {}, [user, loading]);
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <h1 className="text-white text-3xl font-bold mb-4">Register</h1>
      <div className="bg-white rounded-lg max-[390px]:w-72 p-6 shadow-md w-96">
        <input
          type="text"
          className="w-full py-2 px-3 mb-4 rounded-md border border-gray-300"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
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
        <button
          onClick={register}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-bold"
        >
          Register
        </button>
        <button
          onClick={signInWithGoogle}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md font-bold flex items-center justify-center mt-2"
        >
          <FcGoogle className="text-xl mr-2" />
          Login with Google
        </button>
      </div>
    </div>
  );
}
export default SignUp;
