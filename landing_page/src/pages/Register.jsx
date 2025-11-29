import { useState } from "react";
import OAuth from "../components/OAuth";
import { useNavigate } from "react-router-dom";
import { userAuth } from "../store/Store";
import useAxios from "../hooks/useAxios";

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { registerValidationSchema, signInValidationSchema } from '../validations/auth.js';
import PhoneInput from "../components/PhoneInput";

const SignInUp = () => {

  const setUser = userAuth((state) => state.setUser);
  const { sendRequest, loading, error } = useAxios();
  const navigate = useNavigate();

  const [isSignUp, setIsSignUp] = useState(false);
  const [see, setSee] = useState(false);
  const [role, setRole] = useState("user");

  const toggleForm = () => setIsSignUp(!isSignUp);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-700 overflow-hidden">
      <div className={`relative w-full md:w-[800px] max-w-full ${isSignUp ? 'min-h-[600px]' : 'min-h-[500px]'} bg-white rounded-[30px] shadow-lg overflow-hidden transition-all duration-500`}>

        {/* Sign In Form */}
        <div className={`absolute top-0 left-0 h-full w-full mt-20 sm:mt-0 md:mt-0 lg:mt-0 md:w-1/2 flex flex-col items-center justify-center px-4 md:px-10 transition-all duration-500 ${isSignUp ? "md:translate-x-full opacity-0 z-10" : "opacity-100 z-30"}`}>
          <h2 className="text-2xl font-bold">Sign In</h2>
          <p className="text-sm mb-2">or use your email account</p>

          {/* Role Buttons */}
          <div className="flex gap-3 my-3 font-semibold">
            <button type="button" onClick={() => setRole("user")} className={`px-4 py-1 rounded-lg ${role === "user" ? "bg-indigo-900 text-white" : "bg-gray-200"}`}>Login as User</button>
            <button type="button" onClick={() => setRole("owner")} className={`px-4 py-1 rounded-lg ${role === "owner" ? "bg-indigo-900 text-white" : "bg-gray-200"}`}>Login as owner</button>
          </div>

          <Formik
            initialValues={{
              email: '',
              password: ''
            }}
            validationSchema={signInValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const signInData = { ...values, role };
                const res = await sendRequest("POST", "/login", signInData);

                if (res?.success) {
                  setUser({
                    accessToken: res?.results?.accessToken,
                    refreshToken: res?.results?.refreshToken,
                    role: res?.results?.role,
                  });
                  navigate("/dashboard");
                }
              } catch (err) {
                console.error(err);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, values, handleChange }) => (
              <Form className="w-full">
                <input
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="bg-gray-200 border-none p-2 rounded-lg w-full my-2 outline-none"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm my-1" />

                <div className="flex justify-between items-center w-full bg-gray-200 rounded-lg">
                  <input
                    type={see ? 'text' : 'password'}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="bg-gray-200 border-none px-2 rounded-lg w-full my-2 outline-none"
                  />
                  <button
                    hidden={values.password === ''}
                    type="button"
                    onClick={() => setSee(!see)}
                    className="p-1"
                  >
                    <img src={`/assets/icons/${see ? 'eye.svg' : 'eye-off.svg'}`} alt="" />
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm my-1" />

                {error && <p className="text-red-500 text-sm my-1">{error.message || error}</p>}

                <button
                  type="submit"
                  className="bg-indigo-900 w-full text-white font-bold text-sm uppercase px-6 py-2 rounded-lg mt-4 flex justify-center items-center gap-2"
                  disabled={isSubmitting || loading}
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                    </svg>
                  ) : "Sign In"}
                </button>
              </Form>
            )}
          </Formik>

          <OAuth para={isSignUp} />
        </div>

        {/* Sign Up Form */}
        <div className={`absolute top-0 left-0 h-1/2 mt-[250px] md:mt-[130px] lg:mt-[130px] w-full md:w-1/2 flex flex-col items-center justify-center px-4 md:px-10 transition-all duration-500 ${isSignUp ? "opacity-100 z-30" : "md:translate-x-full opacity-0 z-10"}`}>
          <h2 className="text-2xl font-bold">Sign Up</h2>
          <p className="text-sm mb-2">or use your email account</p>

          <div className="flex gap-3 my-3">
            <button type="button" onClick={() => setRole("user")} className={`px-4 py-1 rounded-lg border ${role === "user" ? "bg-indigo-900 text-white" : "bg-gray-200"}`}>Register as User</button>
            <button type="button" onClick={() => setRole("owner")} className={`px-4 py-1 rounded-lg border ${role === "owner" ? "bg-indigo-900 text-white" : "bg-gray-200"}`}>Register as owner</button>
          </div>

          <Formik
            initialValues={{
              fullName: '',
              email: '',
              phone: '',
              password: '',
              countryCode: '+91', // ADDED
            }}
            validationSchema={registerValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                const signUpData = { ...values, role };

                console.log(signUpData)
                const res = await sendRequest("POST", "/register", signUpData);

                if (res?.success) {
                  setIsSignUp(false);
                }
              } catch (err) {
                console.error(err);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({ isSubmitting, setFieldValue }) => (
              <Form className="w-full">

                <Field
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  className="bg-gray-200 border-none p-2 rounded-lg w-full my-2 outline-none"
                />
                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm my-1" />

                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="bg-gray-200 border-none p-2 rounded-lg w-full my-2 outline-none"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm my-1" />

                {/* COUNTRY CODE DROPDOWN (NO STYLE CHANGES) */}
                <div className="flex gap-2 w-full my-2">
                  <select
                    className="bg-gray-200 border-none p-2 rounded-lg outline-none"
                    onChange={(e) => setFieldValue("countryCode", e.target.value)}
                  >
                    <option value="+91">+91 (India)</option>
                    <option value="+1">+1 (USA)</option>
                    <option value="+44">+44 (UK)</option>
                    <option value="+971">+971 (UAE)</option>
                  </select>

                  <Field
                    name="phone"
                    component={PhoneInput}
                  />
                </div>

                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm my-1" />
                <ErrorMessage name="countryCode" component="div" className="text-red-500 text-sm my-1" />

                <div className="flex justify-between items-center w-full bg-gray-200 rounded-lg">
                  <Field
                    type={see ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className="bg-gray-200 border-none px-2 rounded-lg w-full my-2 outline-none"
                  />
                  <button hidden={false} type="button" onClick={() => setSee(!see)} className="p-1">
                    <img src={`/assets/icons/${see ? 'eye.svg' : 'eye-off.svg'}`} alt="" />
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm my-1" />

                <button
                  type="submit"
                  className="bg-indigo-900 text-white w-full font-bold text-sm uppercase px-6 py-2 rounded-lg mt-4 flex justify-center items-center gap-2 cursor-pointer"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a 8 8 0 018-8v8H4z"></path>
                    </svg>
                  ) : "Sign Up"}
                </button>

                <OAuth para={isSignUp} />
              </Form>
            )}
          </Formik>

        </div>

        {/* Overlay Container */}
        <div className={`absolute top-0 left-0 md:left-auto md:right-0 w-full md:w-1/2 h-1/3 md:h-full overflow-hidden transition-all duration-500 z-50 ${isSignUp ? "-translate-y-0 md:translate-y-0 md:translate-x-0" : "md:translate-x-0"}`}>
          <div className="h-full bg-gradient-to-r from-orange-600 to-orange-800 text-white flex flex-col items-center justify-center px-8 text-center rounded-[30px]">
            <h2 className="text-2xl font-bold">{isSignUp ? "Welcome Back!" : "Hello, Friend!"}</h2>
            <p className="text-sm my-2">{isSignUp ? "Already have an account? Login here." : "Don't have an account? Sign up now!"}</p>
            <button onClick={toggleForm} className="bg-transparent border border-white text-white font-bold text-sm uppercase px-6 py-2 rounded-lg mt-4 z-50">
              {isSignUp ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignInUp;