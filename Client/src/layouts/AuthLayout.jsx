import React from 'react'


const AuthLayout = ({children}) => {
  return (
    <div className='flex justify-center items-center'>
        <div className="w-screen h-screen md:w-[60vw] px-10 pt-8 pb-5">
            <h2 className="text-lg font-semibold">ShopNest</h2>
            {children}
        </div>
    </div>
  )
}

export default AuthLayout;