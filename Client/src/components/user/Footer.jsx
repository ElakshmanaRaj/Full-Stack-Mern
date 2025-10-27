import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { MdMailOutline } from "react-icons/md";
import { LuMapPin } from "react-icons/lu"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 p-6 mt-8">
      <div className="mx-auto p-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        
        {/* Quick Links */}
        <div>
          <h5 className="text-lg font-semibold text-white mb-3">Quick Links</h5>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-purple-400 transition">Home</Link></li>
            <li><Link to="/favorite" className="hover:text-purple-400 transition">Favorites</Link></li>
            <li><Link to="/cart" className="hover:text-purple-400 transition">Cart</Link></li>
            <li><Link to="/orders" className="hover:text-purple-400 transition">My Orders</Link></li>
          </ul>
        </div>

        {/* About Section */}
        <div>
          <h5 className="text-lg font-semibold text-white mb-3">About</h5>
          <p className="text-sm leading-relaxed text-gray-400">
            We are an online store offering the best products at unbeatable prices. 
            Shop with confidence and enjoy fast, secure delivery right to your doorstep.
          </p>
        </div>

        {/* Social Links */}
        <div>
          <div>
            <h5 className="font-semibold mb-3 text-white text-lg">Contact</h5>
            <p className="text-xs">Got Questions?&nbsp;Call us</p>
            <h6 className="text-lg font-medium mt-2.5">9876543210</h6>
            <div className="flex items-center mt-3.5 space-x-2.5">
              <MdMailOutline/>
              <h6 className="text-xs font-medium">shopnest@gmail.com</h6>
            </div>
            <div className="flex items-center mt-2 space-x-2.5">
              <LuMapPin/>
              <h6 className="text-xs font-medium">123 Main Street, Besant Nagar, Chennai</h6>
            </div>
          </div>
          <h5 className="text-lg font-semibold text-white mb-3 mt-5">Follow Us On</h5>
          <div className="flex space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-blue-500 transition duration-300 ease-in-out text-black p-1 rounded bg-white shadow-md"><FaFacebookF size={18} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-pink-500 transition duration-300 ease-in-out text-black p-1 rounded bg-white shadow-md"><FaInstagram size={18} /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-sky-400 transition duration-300 ease-in-out text-black p-1 rounded bg-white shadow-md"><FaTwitter size={18} /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-blue-400 transition duration-300 ease-in-out text-black p-1 rounded bg-white shadow-md"><FaLinkedinIn size={18} /></a>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} ShopNest. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
