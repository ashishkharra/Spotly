import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { forgotApi } from '../APIs/postApi';
import { useToast } from '../components/Toast/ToastProvider';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const handleSendCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await forgotApi.sendCode(email);
      if(res?.message === "Email is required"){
        showToast(res.message, 'error');
      } else {
        showToast("Verification code sent", 'success');
      }

      // now want to go to step 2
      setStep(2);
    } catch (error) {
      showToast("Failed to send code", 'error');
    } finally {
      setIsLoading(false);
    }
  }

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await forgotApi.verifyCode(email, code);
      if(res?.message === "Invalid code"){
        showToast(res.message, 'error');
      } else {
        showToast("Code verified successfully", 'success');
      }

      setTimeout(() => {
        setStep(3);
      }, 1500);

    } catch (error) {
      showToast("Failed to verify code", 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if(!email || !newPassword || newPassword !== confirmPassword){
      showToast("Please fill in all fields correctly", 'error');
      setIsLoading(false);
      return;
    }

    try {
      const res = await forgotApi.resetPassword(email, newPassword);
      if(res?.message === "Email and new password are required"){
        showToast(res.message, 'error');
      } else {
        showToast("Password reset successfully", 'success');
      }

      setTimeout(() => {
        setStep(4);
      }, 1500);

    } catch (error) {
      showToast("Failed to reset password", 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back to Login */}
        <Link 
          to="/" 
          className="inline-flex items-center text-indigo-600 hover:text-indigo-700 mb-6"
        >
          <FiArrowLeft className="mr-2" />
          Back to login
        </Link>

        {/* Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiLock className="text-white text-2xl" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                {step === 1 && 'Reset your password'}
                {step === 2 && 'Check your email'}
                {step === 3 && 'Create new password'}
                {step === 4 && 'Password updated'}
              </h1>
              <p className="text-gray-600">
                {step === 1 && 'Enter your email address and we\'ll send you a verification code'}
                {step === 2 && 'Enter the 6-digit code sent to your email'}
                {step === 3 && 'Your new password must be different from previous passwords'}
                {step === 4 && 'Your password has been successfully updated'}
              </p>
            </div>

            {/* Step 1: Request Reset */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-500" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <motion.button
                  onClick={handleSendCode}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Send verification code'}
                </motion.button>
              </motion.div>
            )}

            {/* Step 2: Verify Code */}
            {step === 2 && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleVerifyCode}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                    Verification code
                  </label>
                  <input
                    type="text"
                    id="code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-center text-xl tracking-widest"
                    placeholder="XXXXXX"
                    maxLength="6"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Enter the 6-digit code sent to {email}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Change email
                  </button>
                  <button
                    onClick={handleSendCode}
                    type="button"
                    className="text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Resend code
                  </button>
                </div>

                <motion.button
                  onClick={handleVerifyCode}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? 'Verifying...' : 'Verify code'}
                </motion.button>
              </motion.form>
            )}

            {/* Step 3: Reset Password */}
            {step === 3 && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onSubmit={handleResetPassword}
                className="space-y-4"
              >
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    New password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-500" />
                    </div>
                    <input
                      type="password"
                      id="newPassword"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                    Confirm password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLock className="text-gray-500" />
                    </div>
                    <input
                      type="password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                </div>

                <div className="bg-indigo-50 p-3 rounded-lg">
                  <p className="text-sm text-indigo-700">
                    <strong>Password requirements:</strong>
                  </p>
                  <ul className="text-sm text-indigo-700 mt-1 list-disc list-inside">
                    <li className={newPassword.length >= 8 ? 'text-green-600' : ''}>
                      At least 8 characters
                    </li>
                    <li className={/[A-Z]/.test(newPassword) ? 'text-green-600' : ''}>
                      One uppercase letter
                    </li>
                    <li className={/\d/.test(newPassword) ? 'text-green-600' : ''}>
                      One number
                    </li>
                    <li className={/[!@#$%^&*]/.test(newPassword) ? 'text-green-600' : ''}>
                      One special character
                    </li>
                  </ul>
                </div>

                <motion.button
                  onClick={handleResetPassword}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading || newPassword !== confirmPassword || newPassword.length < 8}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {isLoading ? 'Updating...' : 'Update password'}
                </motion.button>
              </motion.form>
            )}

            {/* Step 4: Success */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center py-8"
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheckCircle className="text-green-600 text-2xl" />
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Password updated</h2>
                <p className="text-gray-600 mb-6">
                  Your password has been successfully updated.
                </p>
                <Link
                  to="/"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg font-medium inline-block transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Back to login
                </Link>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Need help? <Link to="/support" className="text-indigo-600 hover:text-indigo-700">Contact support</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;