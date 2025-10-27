import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Profile = () => {

  const user = useSelector((state)=>state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogOut = () =>{
    dispatch(logoutUser());
    localStorage.removeItem("token");
    navigate("/");
    toast.success("Log Out successfully",{
      className:"custom-toast"
    });
  }

  return (
    <div className='pt-20 px-3 min-[1000px]:px-24 mx-auto'>
      <div className='flex flex-wrap justify-center items-center mt-5'>
        <div className='p-10'>
        <div className='border-8 border-slate-600 rounded-full'>
          <img 
          className='border rounded-full w-60 h-60 object-cover cursor-pointer transition-all ease-in-out duration-300' 
          src={user?.profileImage} 
          alt="profileImg" />
        </div>
        <h6 className='text-sm text-center font-semibold text-slate-600 mt-2.5'>User</h6>
        </div>
        <div className='flex-1 text-center md:text-left'>
          <h5 className='font-medium text-lg mb-1.5'>{user?.name}</h5>
          <h6 className='font-semibold text-sm'>{user?.email}</h6>
          <button onClick={handleLogOut} className='mt-4 bg-red-500 px-2.5 rounded cursor-pointer font-medium text-white transition-all ease-in-out duration-300 hover:bg-red-600'>
            Log Out
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile;