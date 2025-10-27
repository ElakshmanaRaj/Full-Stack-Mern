import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchUserOrders } from "../redux/orderSlice";

const UserOrder = () => {

  
  const dispatch = useDispatch();
  const { items: orderItems, loading, error } = useSelector((state) => state.orders);
  const user = useSelector((state)=> state.user.user);
  const { path } = useLocation();

  useEffect(()=>{
    window.scroll({top:0, left:0, behavior:"smooth"});
  },[path]);

  useEffect(()=>{
    if(user && user.id){
      dispatch(fetchUserOrders());
    }
  },[dispatch, user]);

  if (!user) {
    return (
      <div className="text-center mt-20">
        <p className="font-semibold text-sm text-gray-500 mb-2">
          Please log in to view your order history.
        </p>
        <Link
          to="/login"
          className="text-emerald-400 underline font-medium hover:text-emerald-500"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  if (loading) {
    return <p className="text-center text-sm mt-20 text-gray-500">Loading orders...</p>;
  }

  if (error) {
    return (
      <p className="text-center text-sm mt-20 text-red-500">
        Failed to load orders: {error}
      </p>
    );
  }

  return (
    <div className="pt-20 px-3 min-[1000px]:px-24 mx-auto">
      <h5 className="font-medium my-2.5 text-purple-500 text-center">
        Your Order Lists
      </h5>
      {orderItems.length === 0 && (
        <div className="my-5 text-center">
          <p className="font-semibold mb-2.5 text-sm text-gray-500">
            {" "}
            Your Order items is empty
          </p>
          <p className="text-emerald-400 underline font-medium">
            <Link to="/">Go Back to shopping</Link>
          </p>
        </div>
      )}

      {orderItems.length > 0 && (
        <div className="mx-auto mt-2 space-y-5">
          {orderItems.map((order) => (
            <div key={order._id} className="border rounded-lg p-4">
              <h4 className="font-semibold text-gray-700">
                Order ID:{" "}
                <span className="text-sm text-gray-500">{order._id}</span>
              </h4>
              <span className="text-xs text-gray-400">
                {new Date(order.createdAt).toLocaleString()}
              </span>
              <ul className="space-y-1 mt-3">
                {order.products.map((p, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span>{p.product.name}</span>
                    <span>
                      ₹{Math.round(p.product.price)} × {p.qty}
                    </span>
                  </li>
                ))}
              </ul>
              <h5 className="font-semibold text-right mt-3">
                Total: ₹{Math.round(order.totalAmount)}
              </h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserOrder;
