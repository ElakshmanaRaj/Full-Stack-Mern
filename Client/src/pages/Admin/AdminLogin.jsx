import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_PATHS, BASE_URL } from '../../utilis/apiPath';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const AdminLogin = () => {

    const [error, setError] = useState(null);
    const [data, setData] = useState({email:"", password:""});
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = ()=>{
      setShowPassword(!showPassword);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setError(null);
            const response = await axios.post(BASE_URL + API_PATHS.ADMIN.ADMIN_LOGIN, data,{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            localStorage.setItem("adminToken", response.data.token);
            navigate("/admin/dashboard");
        } catch (err) {
            if(err.response && err.response.data.message){
                setError(err.response.data.message);
            } else{
                setError("Something went wrong, Please try again later");
            }
            
        }
    }
  return (
    <div className="mx-auto p-5 max-w-md shadow-lg rounded-xl bg-white my-20">
      <h2 className="text-xl font-semibold mb-4">Admin Log In</h2>
      <form className="space-y-5" onSubmit={handleLogin}>
        <div className='flex flex-col'>
        <label className="font-medium text-sm mb-1.5">Email</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={data.email}
          className="w-full text-sm text-gray-700 border p-2 rounded outline-none"
          onChange={(e)=> setData({...data, email: e.target.value})}
        />
        </div>
        <div className='flex flex-col relative'>
        <label className="font-medium text-sm mb-1.5">Password</label>
        <input
          type={ showPassword ? "text": "password" }
          placeholder="Enter your password"
          value={data.password}
          className="w-full text-sm text-gray-700 border p-2 rounded outline-none"
          onChange={(e)=>setData({...data, password: e.target.value})}
        />
        <span onClick={togglePassword} className='cursor-pointer absolute top-9 right-3'>
          { showPassword ? <FaRegEye/> : <FaRegEyeSlash/> }
        </span>
        </div>

        {error && (<p className='text-red-500 text-[14px] mb-3 mt-1'>{error}</p>)}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded cursor-pointer transition ease-in-out duration-300 hover:bg-green-500 disabled:opacity-50"
        >
            Log In
        </button>
      </form>
    </div>
  )
}

export default AdminLogin;