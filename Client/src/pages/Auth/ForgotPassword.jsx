import React, { useState } from 'react';
import AuthLayout from '../../layouts/AuthLayout';
import axios from 'axios';
import { API_PATHS, BASE_URL } from '../../utilis/apiPath';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [data, setData] = useState({ email: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage("");
    setLoading(true);
    try {
      const res = await axios.post(
        `${BASE_URL}${API_PATHS.AUTH.FORGOT_PASSWORD}`,
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      setMessage(res.data.message);
      setTimeout(() => {
        navigate("/reset-otp", { state:{ email: data.email} });
      }, 2000);
      setData({ email: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="h-3/4 md:h-full flex flex-col justify-center">
        <h5 className="font-medium text-lg mt-5 text-center">Forgot Password</h5>
        <form className="space-y-3.5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1.5">Email</label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              placeholder="Enter your submitted email"
              className="border rounded-md p-3.5 w-full text-xs outline-emerald-300"
            />
          </div>
          

          <div className="mt-2.5 text-center">
            <button
              disabled={loading}
              className={`bg-emerald-500 text-white outline-none cursor-pointer p-2 font-medium w-full rounded-md transition-all ease-in-out duration-300 hover:bg-emerald-400 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Processing..." : "Submit"}
            </button>
          </div>

          {error && <p className="text-sm text-red-400 my-1.5">{error}</p>}
          {message && <p className="text-sm text-emerald-500 font-semibold">{message}</p>}
        </form>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
