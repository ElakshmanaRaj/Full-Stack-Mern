import React, { useState } from 'react'
import AuthLayout from '../../layouts/AuthLayout'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { API_PATHS, BASE_URL } from '../../utilis/apiPath';

const ForgotPasswordOTP = () => {


  const { state } = useLocation();
  const email = state?.email || "";
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");

  const handleVerify = async (e) => {

    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage("");


    try {
      const res = await axios.post(`${BASE_URL}${API_PATHS.AUTH.RESET_PASSWORD_OTP}`, { email, otp}, 
        {
          headers:{
            "Content-Type":"application/json"
          }
        }
      );
      setMessage(res.data.message);
      setTimeout(() => {
        navigate("/reset-password", { state :{ email }});
      }, 2000);


    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong, please try again later");
    } finally{
      setLoading(false);
    }
  }



  return (
   <AuthLayout>
    <div className="h-3/4 md:h-full flex flex-col justify-center">
     <h5 className="font-medium text-lg mt-5 text-center">Verify OTP</h5>
     <form className='space-y-3.5' onSubmit={handleVerify}>
        <div className='flex flex-col'>
          <label className="font-medium text-sm mb-1.5">Email</label>
          <input 
          type="email" 
          value={email}
          readOnly
          className="border rounded-md p-3.5 w-full text-xs outline-emerald-300 bg-gray-100 text-gray-600"
           />
        </div>
        <div className="flex flex-col">
            <label className="font-medium text-sm mb-1.5">OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter the OTP sent to your email"
              className="border rounded-md p-3.5 w-full text-xs outline-emerald-300"
              
            />
          </div>
          <div className="mt-2.5 text-center">
            <button
              disabled={loading}
              className={`bg-emerald-500 text-white outline-none p-2 font-medium w-full rounded-md transition-all cursor-pointer ease-in-out duration-300 hover:bg-emerald-400 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
          {error && <p className="text-sm text-red-400 my-1.5">{error}</p>}
          {message && <p className="text-sm text-emerald-500 font-semibold">{message}</p>}
     </form>
    </div>
   </AuthLayout>
  )
}

export default ForgotPasswordOTP