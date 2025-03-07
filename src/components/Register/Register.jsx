import React, { useState } from "react";
import OAuth from "../OAuth/OAuth";

const SignInUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const toggleForm = () => {
    console.log('clicked')
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="flex justify-center items-center max-h-full bg-gradient-to-r from-gray-900 to-gray-700 p-4">
      <div className="relative w-full md:w-[798px] max-w-full min-h-[600px] bg-white rounded-[30px] shadow-lg overflow-hidden transition-all duration-500">
        {/* Sign In Form */}
        <div
          className={`absolute top-0 left-0 h-full w-full mt-28 sm:mt-0 md:mt-0 lg:mt-0 md:w-1/2 flex flex-col items-center justify-center px-4 md:px-10 transition-all duration-500 ${isSignUp
            ? "md:translate-x-full opacity-0 z-10"
            : "opacity-100 z-30"
            }`}
        >
          <h2 className="text-2xl font-bold">Sign In</h2>
          <p className="text-sm">or use your email account</p>
          <form action="">
            <input
              type="email"
              placeholder="Email"
              className="bg-gray-200 border-none p-2 rounded-lg w-full my-2 outline-none"
            />
            <input
              type="number"
              placeholder="Phone Number"
              className="bg-gray-200 border-none p-2 rounded-lg w-full my-2 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-200 border-none p-2 rounded-lg w-full my-2 outline-none"
            />
            <a href="#" className="text-xs text-gray-600 my-2">
              Forgot password?
            </a>
            <button className="bg-indigo-900 w-full text-white font-bold text-sm uppercase px-6 py-2 rounded-lg mt-4">
              Sign In
            </button>
          </form>
          <OAuth />
        </div>

        {/* Sign Up Form */}
        <div
          className={`absolute top-0 left-0 h-1/2 mt-[250px] md:mt-[130px] lg:mt-[130px] w-full md:w-1/2 flex flex-col items-center justify-center px-4 md:px-10 transition-all duration-500 ${isSignUp
            ? "opacity-100 z-30"
            : "md:translate-x-full opacity-0 z-10"
            }`}
        >
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <p className="text-sm">or use your email account</p>
          <form action="">
            <input
              type="text"
              placeholder="Full Name"
              className="bg-gray-200 border-none p-2 rounded-lg w-full my-2 outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="bg-gray-200 border-none p-2 rounded-lg w-full my-2 outline-none"
            />
            <input
              type="number"
              placeholder="Phone Number"
              className="bg-gray-200 border-none p-2 rounded-lg w-full my-2 outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-gray-200 border-none p-2 rounded-lg w-full my-2 outline-none"
            />
            <button className="bg-indigo-900 text-white w-full font-bold text-sm uppercase px-6 py-2 rounded-lg mt-4">
              Sign Up
            </button>
          </form>
          <OAuth />
        </div>

        {/* Overlay Container */}
        <div
          className={`absolute top-0 left-0 md:left-auto md:right-0 w-full md:w-1/2 h-1/3 md:h-full overflow-hidden transition-all duration-500 z-50 ${isSignUp
            ? "-translate-y-0 md:translate-y-0 md:translate-x-0"
            : "md:translate-x-0"
            }`}
        >
          <div className="h-full bg-gradient-to-r from-orange-600 to-orange-800 text-white flex flex-col items-center justify-center px-8 text-center rounded-[30px]">
            {/* Content remains same */}
            <h2 className="text-2xl font-bold">
              {isSignUp ? "Welcome Back!" : "Hello, Friend!"}
            </h2>
            <p className="text-sm my-2">
              {isSignUp
                ? "Already have an account? Login here."
                : "Don't have an account? Sign up now!"}
            </p>
            <button
              onClick={toggleForm}
              className="bg-transparent border border-white text-white font-bold text-sm uppercase px-6 py-2 rounded-lg mt-4 z-50"
            >
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInUp;