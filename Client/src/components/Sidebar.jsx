import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {


  return (
    <div className="w-64 min-h-screen bg-white shadow p-5 min-[1000px]:p-8">
      <h2 className="text-xl font-semibold">Admin Dashboard</h2>
      <nav className="flex flex-col space-y-8 mt-8">
        <Link to="/admin/dashboard" className='font-medium text-[15px] hover:text-blue-600 ease-in-out duration-300 transition-all'>Dashboard</Link>
        <Link to="/admin/products" className="font-medium text-[15px] hover:text-blue-600 ease-in-out duration-300 transition-all">Products</Link>
        <Link to="/admin/add-product" className='font-medium text-[15px] hover:text-blue-600 ease-in-out duration-300 transition-all'> Add Products </Link>
        <Link to="/admin/orders" className="font-medium text-[15px] hover:text-blue-600 ease-in-out duration-300 transition-all">Orders</Link>
        <Link to="/admin/categories" className="font-medium text-[15px] hover:text-blue-600 ease-in-out duration-300 transition-all">Categories</Link>
      </nav>
      <button onClick={()=> localStorage.removeItem("adminToken")} className='mt-6 bg-red-500 text-white px-3.5 rounded font-medium hover:bg-red-400 duration-300 transition-all ease-in-out cursor-pointer'>
        <Link to="/admin/login">Log Out</Link>
      </button>
    </div>
  )
}

export default Sidebar
