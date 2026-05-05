import React, { useState, useEffect } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/orders/allOrders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-semibold text-center mb-6">My Orders</h1>

      <div className="max-w-3xl mx-auto space-y-4">
        {orders.map((i) => (
          <div
            key={i.id}
            className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Order</span>
              <span
                className={`text-sm px-2 py-1 rounded ${
                  i.status === "PENDING"
                    ? "bg-yellow-100 text-yellow-700"
                    : i.status === "DELIVERED"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                }`}
              >
                {i.status}
              </span>
            </div>

            <div className="text-sm text-gray-700 mb-2">
              {i.orderItems.map((item) => item.product.name).join(", ")}
            </div>

            <div className="justify-between items-center">
              <span className="font-semibold">₹{i.totalAmt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
