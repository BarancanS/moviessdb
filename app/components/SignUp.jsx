import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FcGoogle } from "react-icons/fc";
import {
  auth,
  logout,
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
    <div className="w-full h-[50vh] flex flex-col items-center justify-center">
      <h1 className="text-white ml-2 font-medium text-3xl mb-2">Register</h1>
      <div className="flex flex-col items-center justify-center gap-2 p-2 border rounded-lg border-white border-double w-62">
        <input
          type="text"
          className="text-center text-black font-extrabold rounded-lg w-56 h-8"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
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
          className="bg-slate-600 w-56 h-10 rounded-xl p-2 flex flex-row items-center justify-center cursor-pointer"
          onClick={register}
        >
          Register
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
export default SignUp;
