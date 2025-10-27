import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { clearCart, decreaseQuantity, increaseQuantity, removeFromCart } from '../redux/cartSlice';
import AuthModal from '../components/auth/AuthModal';
import { createOrder } from "../redux/orderSlice";
import { toast } from 'react-toastify';


const Cart = () => {

  const cartItems = useSelector((state)=> state.cart.items);
  const dispatch = useDispatch();
  const total = cartItems.reduce((sum, item)=> sum + item.price * item.quantity, 0);
  const user = useSelector((state)=>state.user.user);
  const [showModal, setShowModal] = useState(false);
  const { path } = useLocation();

   useEffect(()=>{
      window.scroll({top:0, left:0, behavior:"smooth"});
    },[path]);


  const handlePlaceOrder = () => {
    if (!user) {
      setShowModal(true);
      return;
    }
    const products = cartItems.map(item => ({
      product: item.id,
      qty: item.quantity
    }));
    dispatch(clearCart());
    dispatch(createOrder(products))
      .unwrap()
      .then((orderDetails) => {
        toast.success(`Order placed successfully! ₹ ${orderDetails.totalAmount}`, {
          className:"custom-toast",
        });
      })
      .catch(err => {
        toast.error("Failed to place order: " + err, {
          className:"custom-toast",
        });
      });
  }

  return (
    <div className='pt-20 px-3 min-[1000px]:px-24 mx-auto'>
      <h5 className='font-medium my-2.5 text-purple-500 text-center'>Your Cart Lists</h5>
      { cartItems.length === 0 && (
        <div className='my-5 text-center'>
          <p className='font-semibold mb-2.5 text-sm text-gray-500'> Your Cart items is empty</p>
          <p className='text-emerald-400 underline font-medium'><Link to="/">Go Back to shopping</Link></p>
        </div>
      )}
      { cartItems.length > 0 && (
        <div className='space-y-5 mt-2.5 mx-auto'>
          {
            cartItems.map((item)=>(
              <div key={item.id} className='flex flex-wrap gap-4 md:gap-6 items-center border justify-center md:justify-between rounded-lg p-2.5'>
              <div className='flex flex-wrap items-center justify-center md:justify-start space-x-3.5'>
                {item.images[0] && (
                  <img 
                  src={item.images[0]} 
                  alt={item.name}
                  className='w-20 h-20 object-contain cursor-pointer transition-all ease-in-out duration-300 hover:scale-105'
                   />
                )}
                <div>
                  <h5 className='font-semibold mb-1.5'>{item.name}</h5>
                  <p className='font-medium text-sm mb-2'>Price:&nbsp;₹{Math.round(item.price)}</p>
                  <p className='font-medium text-sm'>Qty: {item.quantity}</p>
                  <div className='flex mt-2 items-center flex-wrap gap-2'>
                    <button onClick={()=> dispatch(increaseQuantity(item.id))} 
                    className='bg-emerald-400 text-white px-2.5 text-sm rounded-md cursor-pointer transition-all ease-in-out duration-300 hover:bg-emerald-500'> 
                      + Qty 
                    </button>
                    <button onClick={()=>dispatch(decreaseQuantity(item.id))}
                    className='bg-red-400 text-white px-2.5 text-sm rounded-md cursor-pointer transition-all ease-in-out duration-300 hover:bg-red-500'> 
                      - Qty
                    </button>
                  </div>
                  <h5 className='mt-2.5 font-medium'>Total: ₹{Math.round(item.price * item.quantity)}</h5>
                </div>
              </div>
              <div>
                <button
                onClick={()=> dispatch(removeFromCart(item.id))} 
                  className='bg-red-400 text-white px-2.5 rounded-md py-0.5 cursor-pointer transition-all ease-in-out duration-300 hover:bg-red-500'>
                 Remove
                </button>
              </div>
            </div>
            ))
          }
          <div className='mb-2.5 text-center'>
            <button 
             onClick={()=>dispatch(clearCart())}
             className='bg-red-400 text-white rounded-md px-2.5 transition-all ease-in-out duration-300 cursor-pointer hover:bg-red-500'>
              Clear Cart
            </button>
          </div>
          <div className='flex flex-col justify-center items-center gap-1.5 mb-2.5'>
          <h5 className='font-semibold text-center my-2.5'>Overall Price: {total}</h5>
           <button onClick={handlePlaceOrder} className='bg-emerald-400 text-white px-2 rounded-md cursor-pointer transition-all ease-in-out duration-300 hover:bg-emerald-500'>
              Place Order
            </button>
          </div>
        </div>
      )}
      <AuthModal isOpen={showModal} onClose={()=>setShowModal(false)}/>
    </div>
  )
}

export default Cart;