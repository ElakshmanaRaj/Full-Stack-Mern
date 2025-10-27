import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../../layouts/AuthLayout";
import axios from "axios";
import { API_PATHS, BASE_URL } from "../../utilis/apiPath";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";


const ResetPassword = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email || "";

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");
    
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}${API_PATHS.AUTH.RESET_PASSWORD}`,
        { email, password: formData.password },
        { headers: { "Content-Type": "application/json" } }
      );

      setMessage(res.data.message || "Password reset successful!");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
      
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="h-3/4 md:h-full flex flex-col justify-center">
        <h5 className="font-medium text-lg mt-5 text-center">Reset Password</h5>
        <form className="space-y-3.5" onSubmit={handleSubmit}>
          {/* Email */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1.5">Email</label>
            <input
              type="email"
              value={email}
              readOnly
              className="border rounded-md p-3.5 w-full text-xs outline-emerald-300 bg-gray-100 text-gray-600"
            />
          </div>

          {/* New Password */}
          <div className="flex flex-col relative">
            <label className="font-medium text-sm mb-1.5">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              placeholder="Enter new password"
              onChange={(e)=> setFormData({...formData, password: e.target.value})}
              className="border rounded-md p-3.5 w-full text-xs outline-emerald-300"
            />
            <span
              className="absolute right-4 top-10 cursor-pointer text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaRegEye/> : <FaRegEyeSlash />}
            </span>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col relative">
            <label className="font-medium text-sm mb-1.5">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              placeholder="Re-enter new password"
              onChange={(e)=>setFormData({...formData, confirmPassword: e.target.value})}
              className="border rounded-md p-3.5 w-full text-xs outline-emerald-300"
            />
            <span
              className="absolute right-4 top-10 cursor-pointer text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
            </span>
          </div>

          {/* Submit Button */}
          <div className="mt-2.5 text-center">
            <button
              disabled={loading}
              className={`bg-emerald-500 text-white outline-none p-2 cursor-pointer font-medium w-full rounded-md transition-all ease-in-out duration-300 hover:bg-emerald-400 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </div>

          {/* Messages */}
          {error && <p className="text-sm text-red-400 my-1.5">{error}</p>}
          {message && <p className="text-sm text-emerald-500 font-semibold">{message}</p>}
        </form>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
