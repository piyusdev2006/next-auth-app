"use client";

import Link from "next/link";
import  { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast/headless";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const onLogin = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/users/login", user);
      toast.success("Login successful. Redirecting to dashboard...");

      console.log(`Response: login successful ${JSON.stringify(response.data)}`);
      toast.success("Login successful. Redirecting to dashboard...");
      router.push("/profile");

    } catch (error: any) {
      console.log(`Login failed: ${error.message}`);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
   }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">{ loading ? 'Logging in...' : 'Login' }</h1>
      <hr />
      <label htmlFor="email">Email:</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
        type="email"
        id="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="Email"
      />

      <label htmlFor="password">Password:</label>
      <input
        className="p-2 border border-gray-300 rounded-md mb-4 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
        type="password"
        id="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Password"
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded *:focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:scale-105 focus:scale-105"
        onClick={onLogin}
        disabled={buttonDisabled}>
        {buttonDisabled ? 'Please fill all fields' : 'Login'}
      </button>
      <Link href="/signup" className="text-blue-500 hover:text-blue-700">
        Don't have an account? Sign Up
      </Link>
    </div>
  );
}
