import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "../../components/DashboardLayout";
import axios from "axios";
import { AdminContext } from "../../context/adminContext";
import { API_PATHS, BASE_URL } from "../../utilis/apiPath";
import {
  PieChart,
  Pie,
  Cell,
  Bar,
  BarChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const AdminDashboard = () => {
  const token = localStorage.getItem("adminToken");
  const [count, setCount] = useState({
    productCounts: 0,
    orderCounts: 0,
    stockCounts: 0,
  });
  const [error, setError] = useState(null);
  const { admin, loading } = useContext(AdminContext);

  if (!token) {
    return <Navigate to="/admin/login" />;
  }

  const fetchSummary = async () => {
    try {
      const response = await axios.get(BASE_URL + API_PATHS.ADMIN.SUMMARY, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCount(response.data);
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong, Please try again later");
      }
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) return <p className="p-5">Loading...</p>;

  // Pie Chart
  const pieData = [
    { name: "Products", value: count.productCounts },
    { name: "Orders", value: count.orderCounts },
    { name: "Stocks", value: count.stockCounts },
  ];

  // Bar Chart
  const barData = [
    { name: "Products", Products: count.productCounts },
    { name: "Orders", Orders: count.orderCounts },
    { name: "Stocks", Stocks: count.stockCounts },
  ];

  const COLORS = ["#4F46E5", "#B13BFF", "#59AC77"];

  return (
    <DashboardLayout>
      <div className="p-5 lg:pl-72 lg:my-5">
        <div className="flex justify-between items-center mb-2.5 p-2.5">
          <h1 className="font-semibold">
            {" "}
            Welcome, {admin?.name || "Admin"} &nbsp;{" "}
            <span className="bg-blue-600 text-white text-[14px] rounded px-1.5 py-0.5">
              Admin
            </span>
          </h1>
        </div>

        {error && <p className="text-red-500 text-[15px] mb-3.5">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded p-4 md:p-6">
            <h2 className="text-lg font-semibold">Total Products</h2>
            <p className="text-xl font-bold mt-2">{count.productCounts}</p>
          </div>
          <div className="bg-white shadow rounded p-4 md:p-6">
            <h2 className="text-lg font-semibold">Orders</h2>
            <p className="text-xl font-bold mt-2">{count.orderCounts}</p>
          </div>
          <div className="bg-white shadow rounded p-4 md:p-6">
            <h2 className="text-lg font-semibold">Stocks</h2>
            <p className="text-xl font-bold mt-2">{count.stockCounts}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Pie Chart */}
          <div className="bg-white shadow rounded p-5">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={2}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      fontSize: "12px",
                      marginTop: "10px",
                    }}
                  />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="bg-white shadow rounded p-5">
            <div className="w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend
                    layout="horizontal"
                    verticalAlign="bottom"
                    align="center"
                    wrapperStyle={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "center",
                      fontSize: "12px",
                      marginTop: "10px",
                    }}
                  />
                  <Bar dataKey="Products" fill="#4F46E5" radius={[12, 12, 0, 0]} />
                  <Bar dataKey="Orders" fill="#B13BFF" radius={[12, 12, 0, 0]} />
                  <Bar dataKey="Stocks" fill="#82ca9d" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
