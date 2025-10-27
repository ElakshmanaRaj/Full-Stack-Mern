import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LogIn from './pages/Auth/LogIn';
import SignUp from './pages/Auth/SignUp';
import OTP from './pages/Auth/OTP';
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Favorite from "./pages/Favorite";
import AdminLogin from './pages/Admin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import Product from './pages/Admin/Product';
import Category from './pages/Admin/Category';
import Order from './pages/Admin/Order';
import AdminProvider from './context/adminContext';
import AddProduct from './pages/Admin/AddProduct';
import ProductDetail from './pages/Admin/ProductDetail';
import ViewDetail from './pages/ViewDetail';
import Products from './pages/Products';
import Search from './pages/Search';
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ForgotPasswordOTP from './pages/Auth/ForgotPasswordOTP';
import ResetPassword from './pages/Auth/ResetPassword';
import UserOrder from './pages/UserOrder';
import Profile from './pages/Auth/Profile';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
   <>
   <AdminProvider>
   <Router>
    <Routes>
      {/* User Routes */}
      <Route path='/login' element = {<LogIn/>}/>
      <Route path='/signup' element = {<SignUp/>} />
      <Route path='/otp-verify' element = {<OTP/>} />
      <Route path='/forgot-password' element = {<ForgotPassword/>} />
      <Route path='/reset-otp' element = {<ForgotPasswordOTP/>} />
      <Route path='/reset-password' element = {<ResetPassword/> }/>
      <Route element={<UserLayout/>}>
      <Route path="/" element = {<Navigate to="home"/>}/>
      <Route path='/home' element = {<Home/>}/>
      <Route path='/cart' element = {<Cart/>} />
      <Route path='/favorite' element = {<Favorite/>} />
      <Route path='/products' element = {<Products/>} />
      <Route path='/product/:id' element = {<ViewDetail/>}/>
      <Route path='/search/:query' element = {<Search/>} />
      <Route path='/orders' element = { <UserOrder/> }  />
      <Route path='/profile' element = {<Profile/>} />
      </Route>
      {/* Admin Routes */}
      <Route element={<AdminLayout/>}>
      <Route path='/admin/login' element= {<AdminLogin/>}/>
      <Route path='/admin/dashboard' element= {<AdminDashboard/>}/>
      <Route path='/admin/products' element= {<Product/>}/>
      <Route path='/admin/product/:id' element= {<ProductDetail/>} />
      <Route path='/admin/add-product' element={<AddProduct/>} />
      <Route path='/admin/categories' element= {<Category/>}/>
      <Route path='/admin/orders' element={<Order/>}/>
      </Route>
    </Routes>
   </Router>
   <ToastContainer autoClose={3000} position='top-center'/>
   </AdminProvider>
   </>
  )
}

export default App;