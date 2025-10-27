import React, { useEffect, useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import axios from "axios";
import { Navigate } from 'react-router-dom';
import { API_PATHS, BASE_URL } from '../../utilis/apiPath';

const Order = () => {
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("adminToken");

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  const getOrders = async () => {
    try {
      const response = await axios.get( BASE_URL+ API_PATHS.ORDER.GET_ORDER , {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });
      setOrders(response.data.orders);
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong, Please try again later");
      }
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <DashboardLayout>
      <div className="p-5 lg:pl-72 lg:my-5">
        <h2 className="text-xl font-semibold mb-3">Orders List</h2>
        {error && <p className="text-red-500 text-[14px]">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
          {orders.length > 0 ? (
            orders.map((order) => (
              <div key={order._id} className="border p-4 rounded shadow mb-0.5">
                <h6 className="font-medium mb-1">Order ID: {order._id}</h6>
                <p className="text-sm text-gray-600 mb-1.5">
                  Customer: <span className="font-medium">{order.user?.name}</span>
                </p>
                <p className="text-sm text-gray-600">
                Email: {order.user?.email}
                </p>
                <div className="mt-2">
                  <h4 className="font-medium">Products:</h4>
                  <ul>
                    {order.products.map((p, i) => (
                      <li key={i}>
                        {p.product?.name} (Qty: {p.qty}) (Price: {p.product?.price})
                      </li>
                    ))}
                  </ul>
                </div>
                <p className='mt-1.5 font-medium'>Amount: {order.totalAmount}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No orders found.</p>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Order;