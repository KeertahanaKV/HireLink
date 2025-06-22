import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const RecuriteLogin = () => {
  const navigate = useNavigate();
  const { setshowRecuriterLogin, backendUrl, setCompanyData, setCompanyToken } =
    useContext(AppContext);

  const [state, setState] = useState("Login"); // 'Login' or 'Signup'
  const [step, setStep] = useState(1); // 1: form, 2: logo upload
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [logo, setLogo] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state === "Signup") {
      if (step === 1) {
        setStep(2);
        return;
      }

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("imageFile", logo);

      try {
        const { data } = await axios.post(
          `${backendUrl}/api/company/register`,
          formData
        );

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setshowRecuriterLogin(false);
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Signup error:", error.response?.data || error.message);
        alert("Something went wrong during signup.");
      }

      return;
    }

    // Login flow
    if (state === "Login") {
      try {
        const { data } = await axios.post(`${backendUrl}/api/company/login`, {
          email,
          password,
        });

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem("companyToken", data.token);
          setshowRecuriterLogin(false);
          navigate("/dashboard");
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Login error:", error.response?.data || error.message);
        alert("Something went wrong. Check the console for error logs.");
      }
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

        <h1 className="text-center text-2xl font-semibold text-gray-800">
          Recruiter {state}
        </h1>
        <p className="text-center text-gray-500 text-sm">
          {state === "Login"
            ? "Welcome back! Please sign in to continue."
            : step === 1
            ? "Create your recruiter account"
            : "Upload your company logo"}
        </p>

        {/* Login Fields */}
        {state === "Login" && (
          <>
            <div className="border px-4 py-2 flex items-center gap-3 rounded-lg">
              <img src={assets.email_icon} alt="" className="w-5 h-5" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full outline-none text-sm"
              />
            </div>

            <div className="border px-4 py-2 flex items-center gap-3 rounded-lg relative">
              <img src={assets.lock_icon} alt="" className="w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full outline-none text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <p className="text-right text-sm text-blue-600 hover:underline cursor-pointer">
              Forgot Password?
            </p>
          </>
        )}

        {/* Signup Step 1 */}
        {state === "Signup" && step === 1 && (
          <>
            <div className="border px-4 py-2 flex items-center gap-3 rounded-lg">
              <img src={assets.person_icon} alt="" className="w-5 h-5" />
              <input
                type="text"
                placeholder="Company Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full outline-none text-sm"
              />
            </div>
            <div className="border px-4 py-2 flex items-center gap-3 rounded-lg">
              <img src={assets.email_icon} alt="" className="w-5 h-5" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full outline-none text-sm"
              />
            </div>
            <div className="border px-4 py-2 flex items-center gap-3 rounded-lg relative">
              <img src={assets.lock_icon} alt="" className="w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full outline-none text-sm pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </>
        )}

        {/* Signup Step 2 */}
        {state === "Signup" && step === 2 && (
          <div className="border-dashed border-2 border-blue-300 p-6 rounded-lg text-center">
            <label
              htmlFor="logo-upload"
              className="cursor-pointer text-blue-600 hover:underline"
            >
              {logo ? logo.name : "Click to Upload Company Logo"}
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

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition cursor-pointer"
        >
          {state === "Login" ? "Login" : step === 1 ? "Next" : "Create Account"}
        </button>

        <p className="text-center text-sm text-gray-500">
          {state === "Login"
            ? "Don't have an account?"
            : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => {
              setState(state === "Login" ? "Signup" : "Login");
              setStep(1);
            }}
            className="text-blue-600 font-medium hover:underline"
          >
            {state === "Login" ? "Create One" : "Login"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default RecuriteLogin;
