import { useState } from "react";
import OAuth from "../components/auth/OAuth";
import { useNavigate, Link } from 'react-router-dom'
import { authApi } from "../APIs/postApi";
import { userAuth } from "../components/store/Store";
import { useToast } from "../components/Toast/ToastProvider";

const Auth = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false);
  const [see, setSee] = useState(false);
  const [forgotPassDialog, setForgotPassDailog] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
  })

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authApi.signUp(formData);
      if (res.success) {
        setIsSignUp(false);
        showToast('Registratered successfully!', 'success');
      }
    } catch (error) {
      console.error('Sign up error:', error);
      showToast(error.message, "error");
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await authApi.signIn(formData);
      if (res.success) {
        userAuth.getState().setUser(res.user);
        showToast("Signed in successfully!", "success");
        navigate('/dashboard')
      }
    } catch (error) {
      console.error('Sign in error:', error);
      showToast(error.message, "error")
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex justify-center items-center max-h-full bg-gradient-to-r from-gray-900 to-gray-700 p-4 min-h-screen">
      <div className={`relative w-full md:w-[800px] max-w-full ${isSignUp ? 'min-h-[600px]' : 'min-h-[500px]'} bg-white rounded-[30px] shadow-lg overflow-hidden transition-all duration-500`}>
        {/* Sign In Form */}
        <div
          className={`absolute top-0 left-0 h-1/2 mt-[200px] md:mt-[130px] lg:mt-[130px] w-full md:w-1/2 flex flex-col items-center justify-center px-4 md:px-10 transition-all duration-500 ${!isSignUp
            ? "opacity-100 z-30"
            : "md:translate-x-full opacity-0 z-10"
            }`}
        >
          <h2 className="text-2xl font-bold">Sign In</h2>
          <p className="text-sm">or use your email account</p>
          <form className="w-full" onSubmit={handleSignIn}>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="bg-gray-200 border-none p-2 rounded-lg w-full my-2 outline-none"
            />
            <div className="flex justify-between items-center w-full bg-gray-200 rounded-lg h-fit">
              <input
                type={see ? 'text' : 'password'}
                onChange={handleChange}
                value={formData.password}
                name="password"
                placeholder="Password"
                className="bg-gray-200 border-none p-2 rounded-lg w-full outline-none"
              />
              <button hidden={formData.password === ''} type="button" onClick={() => setSee(!see)} className="p-1"><img src={`/assets/icons/${see ? 'eye.svg' : 'eye-off.svg'}`} alt="" /></button>
            </div>
            <Link to={'/forgot-password'} className="text-sm text-gray-600 my-2 align-middle">
              Forgot password?
            </Link>
            <button type="submit" className="cursor-pointer bg-indigo-900 w-full text-white font-bold text-sm uppercase px-6 py-2 rounded-lg mt-4">
              {loading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <OAuth para={isSignUp} />
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
          <form onSubmit={handleSignUp}>
            <input
              type="text"
              name="fullName"
              onChange={handleChange}
              value={formData.fullName}
              placeholder="Full Name"
              className="bg-gray-200 border-none p-2 rounded-lg w-full my-2 outline-none"
            />
            <input
              type="email"
              name="email"
              onChange={handleChange}
              value={formData.email}
              placeholder="Email"
              className="bg-gray-200 border-none p-2 rounded-lg w-full my-2 outline-none"
            />
            <input
              type="text"
              name="phone"
              onChange={handleChange}
              value={formData.phone}
              placeholder="Phone Number"
              inputMode="numeric"
              pattern="[0-9]*"
              className="bg-gray-200 border-none p-2 rounded-lg w-full my-2 outline-none"
            />

            <div className="flex justify-between items-center w-full bg-gray-200 rounded-lg">
              <input
                type={see ? 'text' : 'password'}
                name="password"
                onChange={handleChange}
                value={formData.password}
                placeholder="Password"
                className="bg-gray-200 border-none px-2 rounded-lg w-full my-2 outline-none"
              />
              <button hidden={formData.password === ''} type="button" onClick={() => setSee(!see)} className="p-1"><img src={`/assets/icons/${see ? 'eye.svg' : 'eye-off.svg'}`} alt="" /></button>
            </div>
            <button type="submit" className="cursor-pointer bg-indigo-900 text-white w-full font-bold text-sm uppercase px-6 py-2 rounded-lg mt-4">
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
            <OAuth para={isSignUp} />
          </form>
        </div>

        <div
          className={`absolute top-0 left-0 md:left-auto md:right-0 w-full md:w-1/2 h-1/3 md:h-full overflow-hidden transition-all duration-500 z-40 ${isSignUp
            ? "-translate-y-0 md:translate-y-0 md:translate-x-0"
            : "md:translate-x-0"
            }`}
        >
          <div className="h-full bg-gradient-to-r from-indigo-600 to-indigo-800 text-white flex flex-col items-center justify-center px-8 text-center rounded-[30px]">
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

export default Auth;