import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiShield } from 'react-icons/fi';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { signInValidationSchema } from '../validations/auth.js';
import { adminAuthApi } from '../apis/apis.js';
import useAxios from '../hooks/useAxios.jsx';
import Toast from '../components/ui/Toast.jsx';
import { userAuth } from '../store/store.jsx'

const SignIn = () => {
  const { sendRequest, loading, error } = useAxios(adminAuthApi)
  const setUser = userAuth(state => state.setUser)
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-gray-50 flex flex-col lg:flex-row">
      {/* Left side - Branding & Stats */}
      <div className="z-50 absolute">{showToast && <Toast message={toastMessage} type={toastType} />}</div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:w-1/2 bg-gradient-to-br from-orange-500 to-orange-700 p-8 lg:p-12 flex flex-col justify-between"
      >
        <div>
          <Link to="/" className="inline-block">
            <div className="flex items-center space-x-3">
              <img
                src="/images/lehLogo2.png"
                alt="Spotly Logo"
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-3xl font-bold text-white">Spotly</h1>
                <p className="text-orange-100 text-sm">Smart Parking Solutions</p>
              </div>
            </div>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-12 lg:mt-20"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Manage Your Parking<br />
              <span className="text-orange-200">Ecosystem</span> With Ease
            </h2>
            <p className="text-orange-100 mt-4 text-lg max-w-lg">
              Welcome back to your Spotly admin dashboard. Monitor bookings, manage vendors,
              and track commissions from one powerful interface.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side - Login Form */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:w-1/2 flex items-center justify-center p-8 lg:p-12"
      >
        <div className="w-full max-w-md">
          {/* Welcome Back */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your admin dashboard</p>
          </div>

          {/* Quick Login Buttons */}
          <div className="mb-6">
            <div className="grid grid-cols-3 gap-2">
              <button
                key={'admin'}
                onClick={() => handleQuickLogin('admin')}
                className="p-2 text-xs bg-orange-50 text-orange-700 rounded-lg hover:bg-orange-100 transition-colors flex items-center justify-center gap-1"
              >
                <FiUser className="w-3 h-3" />
                {'Admin'}
              </button>
            </div>
          </div>

          {/* Form */}
          <Formik
            initialValues={{
              email: '',
              password: '',
              remember_me: false
            }}
            validationSchema={signInValidationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              setShowToast(false);

              const loginData = { ...values };
              const res = await sendRequest("POST", "/login", loginData);

              if (res.success) {
                setUser({
                  token: res.results?.accessToken,
                  refreshToken: res.results?.refreshToken,
                  role: res.results?.role,
                  rememberMeToken: res.results?.remember_token,
                  email: res.results?.email,
                  profile_image: res.results?.profile_image,
                  last_login: res.results?.last_login,
                  username: res.results?.username,
                });

                setTimeout(() => {
                  setToastMessage(res.message || "Login successfully!");
                  setToastType("success");
                  setShowToast(true);
                }, 10);

                setTimeout(() => {
                  navigate('/dashboard');
                }, 1500);

              } else {
                setTimeout(() => {
                  setToastMessage(res.message || "Something went wrong!");
                  setToastType("error");
                  setShowToast(true);
                }, 10);
              }

              setSubmitting(false);
            }}

          >
            {({ errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
              <Form className="space-y-6">
                {errors.general && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm"
                  >
                    {errors.general}
                    <div className="mt-1 text-xs">
                      Demo: <strong>admin@spotly.com</strong> / <strong>password123</strong>
                    </div>
                  </motion.div>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <Field
                      type="email"
                      name="email"
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="admin@spotly.com"
                      disabled={isSubmitting || loading}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm my-1" />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="h-5 w-5 text-gray-400" />
                    </div>
                    <Field
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all ${errors.password && touched.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                      placeholder="••••••••"
                      disabled={isSubmitting || loading}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      disabled={isSubmitting || loading}
                    >
                      {showPassword ? (
                        <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm my-1" />

                  {error && <p className="text-red-500 text-sm my-1">{error.message || error}</p>}
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Field
                      type="checkbox"
                      name="remember_me"
                      id="remember-me"
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                      disabled={isSubmitting || loading}
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <Link to="/forgot-password" className="font-medium text-orange-600 hover:text-orange-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className={`w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-medium py-3 px-4 rounded-lg hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300 
                    }`}
                >

                  {(isSubmitting || loading) ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-white border-solid rounded-full animate-spin mr-2"></div>
                      Signing in...
                    </div>
                  ) : (
                    'Sign in to dashboard'
                  )}

                </button>
              </Form>
            )}
          </Formik>

        </div>
      </motion.div>

      {/* Background Animation */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </div>
  );
};

export default SignIn;

// ${(isSubmitting || isLoading) ? 'opacity-75 cursor-not-allowed' : ''