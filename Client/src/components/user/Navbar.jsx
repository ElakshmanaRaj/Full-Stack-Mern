import React, { useRef, useState } from 'react'
import { FiSearch } from "react-icons/fi"
import { IoMdHeartEmpty } from "react-icons/io";
import { LuShoppingBag } from "react-icons/lu";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { HiOutlineX } from 'react-icons/hi';
import { IoCubeOutline } from 'react-icons/io5';
import { useSelector } from 'react-redux';


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const favoriteCount = useSelector((state) => state.favorites.items.length);
  const cartCount = useSelector((state) => state.cart.items.length);
  const orderCount = useSelector((state) => state.orders.items.length);
  const user  = useSelector((state) => state.user.user);
  const inputRef = useRef();

  const toggleProfile = () =>{
    navigate("/profile");
  }


  const handleSearch = (e) => {
    e.preventDefault();
    if (value.trim()) {
      navigate(`/search/${value.trim()}`);
      setValue("");
      setMenuOpen(false);
    }
  };

  return (
    <nav className='bg-white overflow-hidden shadow-md fixed top-0 left-0 z-[999] w-full mx-auto'>
      <div className='flex justify-between items-center mx-auto px-5 lg:px-24 py-3.5 md:py-4'>

        {/* ---------- LOGO + SEARCH ---------- */}
        <div className='flex items-center gap-8'>
          <h6 className='font-semibold md:text-xl'>
            <Link to="/">ShopNest</Link>
          </h6>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className='relative max-[767px]:hidden'>
            <input
              type="search"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder='Search Product'
              className='bg-gray-200 px-3.5 py-1 rounded-[14px] outline-none text-[14px] placeholder:text-xs'
            />
            <FiSearch
              onClick={handleSearch}
              className='absolute top-2 right-3.5 text-[14px] text-gray-600 cursor-pointer'
            />
          </form>
        </div>

        {/* ---------- DESKTOP LINKS ---------- */}
        <div className='flex items-center space-x-4 lg:space-x-6 max-[767px]:hidden'>

          {/* Favorites */}
          <NavLink
            to="/favorite"
            className={({ isActive }) =>
              `relative transition-all ease-in-out duration-300 flex items-center gap-1 px-2 py-1 rounded-md
              ${isActive ? "bg-gray-100 text-red-500 font-medium" : "hover:text-red-500"}`
            }
          >
            <IoMdHeartEmpty size={18} />
            Favorites
            {favoriteCount > 0 && (
              <span className='absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center'>
                {favoriteCount}
              </span>
            )}
          </NavLink>

          {/* Cart */}
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative transition-all ease-in-out duration-300 flex items-center gap-1 px-2 py-1 rounded-md
              ${isActive ? "bg-gray-100 text-purple-600 font-medium" : "hover:text-purple-600"}`
            }
          >
            <LuShoppingBag />
            Cart
            {cartCount > 0 && (
              <span className='absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center'>
                {cartCount}
              </span>
            )}
          </NavLink>
          <NavLink to="/orders" className={({ isActive }) =>
              `relative transition-all ease-in-out duration-300 flex items-center gap-1 px-2 py-1 rounded-md
              ${isActive ? "bg-gray-100 text-purple-600 font-medium" : "hover:text-purple-600"}`
            }>
            <IoCubeOutline/> Orders
            { orderCount > 0 && (
              <span className='absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center'>
                {orderCount}
              </span>
            )}
          </NavLink>

          {/* Login */}
            { user ? (
               <div className='relative'>
                <div onClick={toggleProfile} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-purple-600">
               <img
                 src={user?.profileImage}
                 alt="profile"
                 className="w-8 h-8 rounded-full object-cover border border-gray-300"
               />
             </div>
              </div>
            ) : (
              <NavLink
              to="/login"
              className={({ isActive }) =>
                `relative transition-all ease-in-out duration-300 flex items-center gap-1 px-2 py-1 rounded-md
                ${isActive ? "bg-gray-100 text-purple-600 font-medium" : "hover:text-purple-600"}`
              }
            >
              <FaRegUserCircle />
              <span>Login</span>
            </NavLink>
            ) }
        
        </div>

        {/* ---------- MOBILE ICONS ---------- */}

        <div className='flex items-center space-x-3.5 min-[767px]:hidden'>
          <div onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <HiOutlineX /> : <FiSearch />}
          </div>

          <NavLink to="/favorite" className={({isActive})=> `relative ${isActive ? "text-red-500 font-medium":"hover:text-red-400"}`} >
            <IoMdHeartEmpty/>
            {favoriteCount > 0 && (
              <span className='absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-semibold rounded-full w-3 h-3 flex items-center justify-center'>
                {favoriteCount}
              </span>
            )}
          </NavLink>

          <NavLink to="/cart" className={({isActive})=> `relative ${isActive ? "text-purple-500 font-medium":"hover:text-purple-600"}`}>
            <LuShoppingBag />
            {cartCount > 0 && (
              <span className='absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-semibold rounded-full w-3 h-3 flex items-center justify-center'>
                {cartCount}
              </span>
            )}
          </NavLink>

          <NavLink to="/orders" className={({isActive})=> `relative ${isActive ? "text-purple-500 font-medium":"hover:text-purple-600"}`}>
          <IoCubeOutline/>
            { orderCount > 0 && (
              <span className='absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center'>
                {orderCount}
              </span>
            )}
          </NavLink>
          { user ? (
             <div className='relative'>
             <div onClick={toggleProfile} className="flex items-center gap-2 cursor-pointer text-gray-700 hover:text-purple-600">
            <img
              src={user?.profileImage}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover border border-gray-300"
            />
          </div>
           </div>
          ): (
            <NavLink to="/login">
            <FaRegUserCircle />
          </NavLink>
          )}
          
        </div>
      </div>

      {/* ---------- MOBILE SEARCH ---------- */}
      { menuOpen && (
        <div className={`mb-3 mx-5 transform transition-transform duration-500 ease-in-out relative ${menuOpen ? "translate-y-0" : "-translate-y-0"}`}>
          <form onSubmit={handleSearch}>
            <input
              type="search"
              placeholder='Search Product'
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className='bg-gray-200 px-3.5 py-1 rounded-[14px] outline-none text-[14px] placeholder:text-xs w-full'
            />
            <FiSearch
              onClick={handleSearch}
              className='absolute top-2 right-3 text-xs text-gray-600 cursor-pointer'
            />
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
