"use client"

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast'

import { useRouter } from 'next/navigation'
import axios from 'axios'



export default function SignUpPage() {
  const router = useRouter();
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: ''
    });
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async () => { 
    
    try {
      setLoading(true);
      const response = await axios.post('/api/users/signup', user);
      console.log(`Response : signup successful ${JSON.stringify(response.data)}`);
      toast.success('Sign up successful. You can now log in.');
      router.push('/login');

    } catch (error: any) {
      console.log('Error occurred during sign up:', error.message);
      toast.error('Error occurred during sign up. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { 
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    }
    else {
      setButtonDisabled(true);
    }
  },[user])

    return (
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-2xl font-bold mb-4">{loading ? 'Loading...' : 'Sign Up'}</h1>
        <hr />
        <label htmlFor="username">Username:</label>
        <input
          className="p-2 border border-gray-300 rounded-md mb-4 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Username"
        />

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
          onClick={onSignUp}>
            {buttonDisabled ? 'Please fill all fields' : 'Sign Up'}
            </button>
            <Link href="/login" className="text-blue-500 hover:text-blue-700">
              Already have an account? Login
            </Link>
      </div>
    );
}