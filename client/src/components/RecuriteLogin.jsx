// 

import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';

const RecuriteLogin = () => {
  const { setshowRecuriterLogin } = useContext(AppContext);
  const [state, setState] = useState('Login'); // 'Login' or 'Signup'
  const [step, setStep] = useState(1); // 1: text form, 2: image upload

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [logo, setLogo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state === 'Signup') {
      if (step === 1) {
        setStep(2); // Go to image upload
        return;
      }

      // Step 2: Final signup logic
      console.log('Creating account with:', { name, email, password, logo });
    }

    if (state === 'Login') {
      console.log('Logging in with:', { email, password });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-white p-8 rounded-2xl shadow-lg space-y-6"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setshowRecuriterLogin(false)}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-xl cursor-pointer"
        >
          &times;
        </button>

        {/* Heading */}
        <h1 className="text-center text-2xl font-semibold text-gray-800">
          Recruiter {state}
        </h1>
        <p className="text-center text-gray-500 text-sm">
          {state === 'Login'
            ? 'Welcome back! Please sign in to continue.'
            : step === 1
            ? 'Create your recruiter account'
            : 'Upload your company logo'}
        </p>

        {/* Form Inputs */}
        {state === 'Login' && (
          <>
            {/* Email */}
            <div className="border px-4 py-2 flex items-center gap-3 rounded-lg">
              <img src={assets.email_icon} alt="" className="w-5 h-5" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
                className="w-full outline-none text-sm"
              />
            </div>

            {/* Password */}
            <div className="border px-4 py-2 flex items-center gap-3 rounded-lg">
              <img src={assets.lock_icon} alt="" className="w-5 h-5" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="w-full outline-none text-sm"
              />
            </div>

            {/* Forgot Password */}
            <p className="text-right text-sm text-blue-600 hover:underline cursor-pointer">
              Forgot Password?
            </p>
          </>
        )}

        {/* Signup Step 1 */}
        {state === 'Signup' && step === 1 && (
          <>
            <div className="border px-4 py-2 flex items-center gap-3 rounded-lg">
              <img src={assets.person_icon} alt="" className="w-5 h-5" />
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Company Name"
                required
                className="w-full outline-none text-sm"
              />
            </div>
            <div className="border px-4 py-2 flex items-center gap-3 rounded-lg">
              <img src={assets.email_icon} alt="" className="w-5 h-5" />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Email"
                required
                className="w-full outline-none text-sm"
              />
            </div>
            <div className="border px-4 py-2 flex items-center gap-3 rounded-lg">
              <img src={assets.lock_icon} alt="" className="w-5 h-5" />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                required
                className="w-full outline-none text-sm"
              />
            </div>
          </>
        )}

        {/* Signup Step 2: Upload Logo */}
        {state === 'Signup' && step === 2 && (
          <div className="border-dashed border-2 border-blue-300 p-6 rounded-lg text-center">
            <label
              htmlFor="logo-upload"
              className="cursor-pointer text-blue-600 hover:underline"
            >
              {logo ? logo.name : 'Click to Upload Company Logo'}
            </label>
            <input
              type="file"
              id="logo-upload"
              accept="image/*"
              className="hidden"
              onChange={(e) => setLogo(e.target.files[0])}
              required
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          {state === 'Login' ? 'Login' : step === 1 ? 'Next' : 'Create Account'}
        </button>

        {/* Switch between Login & Signup */}
        <p className="text-center text-sm text-gray-500">
          {state === 'Login'
            ? "Don't have an account?"
            : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => {
              setState(state === 'Login' ? 'Signup' : 'Login');
              setStep(1); // Reset step if switching
            }}
            className="text-blue-600 font-medium hover:underline"
          >
            {state === 'Login' ? 'Create One' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default RecuriteLogin;
