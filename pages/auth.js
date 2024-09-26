"use client";

import React, { useState, useEffect } from 'react';
import { Rocket, User, Lock, Mail, Star } from 'lucide-react';
import StarryBackground from '@/components/StarryBackground';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'; // Import useRouter for redirection

export default function LoginRegisterTabs() {
  const [activeTab, setActiveTab] = useState('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter(); // Initialize router for navigation

  // Redirect to /dashboard if already logged in
  useEffect(() => {
    if (localStorage.getItem('login') === 'true') {
      router.push('/dashboard'); // Redirect to the dashboard if already logged in
    }
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Registration Logic
    if (activeTab === 'register') {
      // Save user info to local storage
      const userInfo = { username, email, password };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      toast.success('Registration successful!'); // Show success toast

      // Switch to login tab after registration
      setActiveTab('login');
      toast.info('Please log in with your new account.');

      // Reset form fields
      setUsername('');
      setEmail('');
      setPassword('');
    } 
    // Login Logic
    else {
      const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));

      // Check if user info exists and matches
      if (storedUserInfo && storedUserInfo.email === email && storedUserInfo.password === password) {
        localStorage.setItem('login', 'true'); // Set login flag in local storage
        toast.success('Login successful!'); // Show success toast
        router.push('/dashboard'); // Redirect to /dashboard after login
      } else {
        setErrorMessage('Invalid credentials. Please try again.');
        toast.error('Invalid credentials. Please try again.'); // Show error toast
      }

      // Reset form fields
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-600 to-purple-800 flex items-center justify-center p-4 relative overflow-hidden">
      <StarryBackground />
      <div className="max-w-md w-full space-y-8 bg-white bg-opacity-10 p-8 rounded-2xl backdrop-blur-lg relative z-10">
        <div className="text-center">
          <Rocket className="mx-auto h-16 w-16 text-yellow-300" />
          <h2 className="mt-6 text-3xl font-extrabold text-white" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Space Explorer Portal
          </h2>
        </div>

        <div className="flex justify-center mb-6">
          <button
            className={`px-6 py-2 text-sm font-medium rounded-tl-lg rounded-bl-lg focus:outline-none transition-colors duration-300 ${
              activeTab === 'login'
                ? 'bg-yellow-300 text-indigo-900'
                : 'bg-indigo-700 text-white hover:bg-indigo-600'
            }`}
            onClick={() => {
              setActiveTab('login');
              setErrorMessage(''); // Reset error message when switching tabs
            }}
          >
            Launch In
          </button>
          <button
            className={`px-6 py-2 text-sm font-medium rounded-tr-lg rounded-br-lg focus:outline-none transition-colors duration-300 ${
              activeTab === 'register'
                ? 'bg-yellow-300 text-indigo-900'
                : 'bg-indigo-700 text-white hover:bg-indigo-600'
            }`}
            onClick={() => {
              setActiveTab('register');
              setErrorMessage(''); // Reset error message when switching tabs
            }}
          >
            Join Crew
          </button>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {activeTab === 'register' && (
            <div>
              <label htmlFor="username" className="sr-only">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300" size={20} />
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-indigo-300 placeholder-indigo-300 text-white bg-indigo-800 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Space Explorer Name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
          )}
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300" size={20} />
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-indigo-300 placeholder-indigo-300 text-white bg-indigo-800 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Cosmic Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-300" size={20} />
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 pl-10 border border-indigo-300 placeholder-indigo-300 text-white bg-indigo-800 bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Stellar Security Code"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-900 bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <Star className="h-5 w-5 text-indigo-700 group-hover:text-indigo-800" aria-hidden="true" />
              </span>
              {activeTab === 'login' ? 'Blast Off!' : 'Join the Space Mission'}
            </button>
          </div>
        </form>

        {activeTab === 'login' && (
          <div className="text-center mt-4">
            <a href="#" className="text-sm text-indigo-200 hover:text-white transition-colors duration-300">
              Lost in space? Recover your cosmic credentials
            </a>
          </div>
        )}
      </div>
      
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </div>
  );
}
