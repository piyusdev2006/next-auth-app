"use client";

import axios from "axios";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";


export default function ProfilePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState("nothing") 

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logout Successful");
            router.push("/login");
        }
        catch(error: any){
            console.log(error.message);
            toast.error(error.message);
        }
    }

    const getUserDetails = async() =>{
        const res = await axios.get("/api/users/userDetail");
        console.log(res.data);
        setData(res.data.data._id); 
    }


    // 1. Loading state ka early return (Clean aur readable)
    if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-xl font-medium text-gray-500">Loading...</h1>
        </div>
    );
    }

    // 2. Main Profile UI (Bina kisi extra nesting ke)
    return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <hr className="w-full max-w-xs border-gray-200 my-2" />
        <h2 className = 'p-2 my-2 bg-gray-800 text-white rounded'>{data === '' ? "nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
        <p className="my-2">Welcome to your profile page!</p>
        <hr className="w-full max-w-xs border-gray-200 my-4" />
        
        <button 
        onClick={getUserDetails} 
        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
        Get User Details
        </button>

        <button 
        onClick={logout} 
        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
        >
        Logout
        </button>
    </div>
    );
}

// to grab  anything thing is url like localhost:3000/profile/1 or localhost:3000/profile/2 what we can do is use the useParams hook from next/navigation. This hook will return an object containing the parameters of the current route. For example, if the current route is /profile/1, then useParams will return { id: '1' }.