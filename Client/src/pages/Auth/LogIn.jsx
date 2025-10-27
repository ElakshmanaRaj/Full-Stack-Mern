import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_PATHS, BASE_URL } from "../../utilis/apiPath";
import AuthLayout from "../../layouts/AuthLayout";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6"
import { useDispatch } from "react-redux";
import { fetchUser } from "../../redux/authSlice";
import { toast } from "react-toastify";


const LogIn = () => {

  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const togglePassword = ()=>{
    setShowPassword(!showPassword);
  }

  
  const validateInputs = () => {
    if (!data.email || !data.password) {
      return "Please enter both email and password";
    }

    // Check email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return "Please enter a valid email address";
    }

    // Check password length
    if (data.password.length < 6) {
      return "Password must be at least 6 characters long";
    }

    return null;

  };

  const handleLogIn = async (e) => {
    e.preventDefault();

    // Run validation
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    setError(null);
    setMessage("");

    try {
      
      const res = await axios.post(`${BASE_URL}${API_PATHS.AUTH.LOGIN}`, data, {
        headers: { "Content-Type": "application/json" },
      });
      
      // Set JWT Token after login
      localStorage.setItem("token", res.data.token);
      await dispatch(fetchUser());

      setMessage(res.data.success);
      setTimeout(() => {
        navigate("/");
      }, 2000);
      toast.success(res.data.success, {
        className:"custom-toast",
      });

    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="h-3/4 md:h-full flex flex-col justify-center">
      <h3 className="text-lg font-bold text-center">Welcome Back</h3>
        <p className="text-xs text-slate-700 mb-3.5 text-center">
          Please enter your login details
        </p>
        <form className="space-y-2.5" onSubmit={handleLogIn}>
          <div className="flex flex-col">
          <label className="font-medium text-sm mb-1.5">Email</label>
          <input 
          value={data.email} 
          type="email" 
          placeholder="Enter your email"
          className="border rounded-md  p-3.5 w-full text-xs outline-emerald-300"
          onChange={(e)=>setData({...data, email: e.target.value})}
           />
          </div>
          <div className="flex flex-col relative">
          <label className="font-medium text-sm mb-1.5">Password</label>
          <input 
          value={data.password} 
          type={showPassword ? "text":"password"}
          placeholder="Enter your password"
          className="border rounded-md p-3.5 w-full text-xs outline-emerald-300" 
          onChange={(e)=>setData({...data, password: e.target.value})}
          />
          <span 
            className="cursor-pointer absolute top-10 right-3" 
            onClick={togglePassword}> 
          { showPassword ? <FaRegEye/> : <FaRegEyeSlash/> }</span>
          </div>
          <div className="flex justify-end">
            <p className="font-medium text-sm text-slate-500 transition-all duration-300 ease-in-out hover:text-black"><Link to="/forgot-password">Forgot Password</Link></p>
          </div>
          <div className="text-center">
            <button 
            disabled={loading}
            className={`bg-emerald-500 text-white outline-none p-2 font-medium w-full rounded-md transition-all cursor-pointer ease-in-out duration-300 hover:bg-emerald-400 ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            >
             {loading ? "Logging..": "Log In"}
            </button>
          </div>
          { error && <p className="text-red-400 text-sm mt-1.5">{error}</p>}
          {message && <p className="text-sm text-emerald-500 font-semibold">{message}</p>}
        </form>
        <div className="mt-3.5 text-center">
          <p className="font-semibold text-sm text-slate-500 mb-2 relative">OR</p>
          <h5 className="font-medium text-sm transition-all ease-in-out duration-300">Don't have an Account? <Link to="/signup" className="text-emerald-500 hover:text-emerald-400">Sign Up</Link></h5>
        </div>
        <div className="mt-3.5 text-center">
          <p className="text-slate-600 font-semibold underline cursor-pointer" onClick={()=> navigate("/")}>Go Back</p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default LogIn;
