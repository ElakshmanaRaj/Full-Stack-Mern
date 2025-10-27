import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthLayout from "../../layouts/AuthLayout";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";
import { API_PATHS, BASE_URL } from "../../utilis/apiPath";

const SignUp = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");



  const chooseFile = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  // --- Submit ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setError("Password do not match!");
      return;
    }

    setLoading(true);

    try {
    
    
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      if (image) formData.append("profileImage", image);

      const response = await axios.post(
        `${BASE_URL}${API_PATHS.AUTH.REGISTER}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

     setMessage(response.data.message);

      setTimeout(()=>{
        navigate("/otp-verify", { state:{ email: data.email }});
      }, 2000);

    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="h-3/4 md:h-full flex flex-col justify-center mb-2.5">
      
        <form className="space-y-3 mt-2" onSubmit={handleSubmit}>
          {/* --- Profile Image --- */}
          <div className="flex justify-center items-center flex-col gap-3.5">
            <input
              type="file"
              ref={inputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <label className="text-sm font-semibold">Add Profile Image</label>

            {image ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="profile"
                  className="w-20 h-20 rounded-full object-cover cursor-pointer transition-all duration-300 ease-in-out hover:scale-110"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="w-8 h-8 flex items-center justify-center shadow bg-white text-red-600 rounded-full absolute -bottom-0 right-1 z-10 cursor-pointer"
                >
                  <LuTrash />
                </button>
              </div>
            ) : (
              <div
                className="w-20 h-20 flex items-center justify-center bg-teal-100/50 rounded-full cursor-pointer relative overflow-hidden"
                onClick={chooseFile}
              >
                <LuUser className="text-4xl text-teal-500 bg-transparent" />
                <button
                  type="button"
                  onClick={chooseFile}
                  className="w-8 h-8 flex items-center justify-center bg-white text-teal-600 rounded-full absolute -bottom-0 right-1 cursor-pointer z-10"
                >
                  <LuUpload />
                </button>
              </div>
            )}
          </div>

          {/* --- Name --- */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1.5">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={data.name}
              onChange={(e)=>setData({...data, name: e.target.value})}
              className="border rounded-md p-3.5 w-full text-xs outline-emerald-300"
            />
          </div>

          {/* --- Email --- */}
          <div className="flex flex-col">
            <label className="font-medium text-sm mb-1.5">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={data.email}
              onChange={(e)=>setData({...data, email: e.target.value})}
              autoComplete="off"
              className="border rounded-md p-3.5 w-full text-xs outline-emerald-300"
            />
          </div>

          {/* --- Password --- */}
          <div className="flex flex-col relative">
            <label className="font-medium text-sm mb-1.5">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create password, password must be more than 6 characters"
              value={data.password}
              onChange={(e)=> setData({...data, password: e.target.value})}
              className="border rounded-md p-3.5 w-full text-xs outline-emerald-300"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute top-10 right-3"
            >
              {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          {/* --- Confirm Password --- */}
          <div className="flex flex-col relative">
            <label className="font-medium text-sm mb-1.5">
              Confirm Password
            </label>
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              value={data.confirmPassword}
              onChange={(e)=>setData({...data, confirmPassword: e.target.value})}
              className="border rounded-md p-3.5 w-full text-xs outline-emerald-300"
            />
            <span
              onClick={() => setShowConfirm(!showConfirm)}
              className="cursor-pointer absolute top-10 right-3"
            >
              {showConfirm ? <FaRegEye /> : <FaRegEyeSlash />}
            </span>
          </div>

          {/* --- Submit Button --- */}
          <div className="text-center">
            <button
              type="submit"
              disabled={loading}
              className={`bg-emerald-500 text-white outline-none cursor-pointer p-2 font-medium w-full rounded-md transition-all ease-in-out duration-300 hover:bg-emerald-400 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Signing..." : "Sign Up"}
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-1.5 text-center">{error}</p>
          )}
          
          {message && <p className="text-sm text-emerald-500 font-semibold">{message}</p>}

        </form>


        <div className="mt-2.5 text-center mb-2.5">
          <p className="font-medium text-sm text-slate-500">
            Already have an account?
            <Link to="/login" className="hover:text-black ml-1">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
