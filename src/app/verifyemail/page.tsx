"use client"

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";



export default function VerifyEmailpage() {

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState("");
    
    const verifyUserEmail = async () => {
        try {
            axios.post("/api/users/verifyemail", { token })
                .then((response) => {
                    console.log("response", response.data);
                    setVerified(true);
                })
                .catch((error) => {
                    console.log("error", error.response.data);
                    setError(error.response.data.message);
                });
        }
        catch (error: any) {
            setError(error.message);
            console.log("error", error.message);
        }
    }


    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, []);

    useEffect(() => {
      if (token.length > 0) {
        verifyUserEmail();
      }
    }, [token]);


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-4xl font-bold">
                Verify Email
            </h1>
            <h2 className="p-2 bg-orange-500 text-black">
                {token ? `Token: ${token}` : "No token found"}
            </h2>
            {verified && (
                <div className="p-2 bg-green-500 text-black">
                    Email verified successfully! You can now <Link href="/login">
                        Login
                        </Link>
                </div>
            )}
            {error && (
                <div className="text-2xl bg-red-500 text-black">
                    {error}
                </div>
            )}
        </div>
    )
}