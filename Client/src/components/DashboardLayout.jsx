import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";

const DashboardLayout = ({ children }) => {
  const [sideMenu, setSideMenu] = useState(false);

  return (
    <div className="flex">
      <div className="max-[1000px]:hidden fixed top-0 left-0 z-[999] flex h-screen bg-gray-100">
        <Sidebar />
      </div>

      <div
        className={`fixed top-0 left-0 z-[999] h-full bg-white shadow-lg min-[1000px]:hidden transform transition-transform duration-500 ease-in-out
        ${sideMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex justify-end p-2">
        <button className="px-3 py-1.5" onClick={() => setSideMenu(false)}>
          <HiOutlineX className="text-2xl font-semibold" />
        </button>
        </div>
        <Sidebar />
      </div>

      <div className="flex-1">
        <div className="mx-5 p-4 min-[1000px]:hidden flex items-center">
          <button onClick={() => setSideMenu(true)}>
            <HiOutlineMenu className="text-2xl font-semibold" />
          </button>
        </div>

        <div className="mx-5">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
