import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OrdersAdmin from "./OrdersAdmin";
import ProductsAdmin from "./ProductsAdmin";

const Dashboard = () => {
  const [totalOrders, setTotalOrders] = useState();
  const [totalProducts, setTotalProducts] = useState();
  const [totalRevenue, setTotalRevenue] = useState();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/");
          return;
        }
        let role = null;
        const decoded = jwtDecode(token);
        role = decoded.role;
        if (role !== "ADMIN") {
          navigate("/");
          return;
        }
        const response = await axios.get(
          "http://localhost:5000/api/dashboard",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setTotalProducts(response.data.totalProducts);
        setTotalOrders(response.data.totalOrders);
        setTotalRevenue(response.data.totalRevenue);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDetails();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Products</p>
          <h2 className="text-xl font-semibold">{totalProducts}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <h2 className="text-xl font-semibold">{totalOrders}</h2>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Revenue</p>
          <h2 className="text-xl font-semibold">₹{totalRevenue}</h2>
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Orders</h2>
        <div className="bg-white p-4 rounded-xl shadow">
          <OrdersAdmin />
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <ProductsAdmin />
      </div>
    </div>
  );
};

export default Dashboard;
