import React from 'react';
import { Link } from 'react-router-dom';

const AuthModal = ({isOpen, onClose}) => {

    if(!isOpen){
        return null;
    }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-slate-50 bg-opacity-50 z-50 mx-auto">
      <div className="bg-white rounded-xl p-4 md:p-6 shadow-xl text-center max-w-sm w-full mx-3.5">
        <h4 className="text-lg font-semibold text-gray-800 mb-3">
          Please Login or Register
        </h4>
        <p className="text-gray-500 mb-4 text-sm">
          You must be logged in to place an order.
        </p>

        <div className="flex justify-center gap-3">
         <button>
         <Link
            to="/login"
            className="bg-purple-500 text-white px-4 py-2 rounded-md transition-all ease-in-out duration-500 hover:bg-purple-600"
            onClick={onClose}
          >
            Login
          </Link>
         </button>
        <button>
        <Link
            to="/signup"
            className="bg-emerald-500 text-white px-4 py-2 rounded-md transition-all ease-in-out duration-500 hover:bg-emerald-600"
            onClick={onClose}
          >
            Register
          </Link>
        </button>
        </div>

        <button
          onClick={onClose}
          className="mt-4 text-gray-400 text-sm underline cursor-pointer hover:text-gray-600"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}

export default AuthModal;