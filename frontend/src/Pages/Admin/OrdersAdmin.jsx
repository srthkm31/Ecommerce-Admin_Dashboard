import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOrders = async () => {
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
        const response = await axios.get("http://localhost:5000/api/orders", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    };
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:5000/api/orders/${orderId}`,
        {
          status: newStatus,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {orders.map((order) => (
        <div
          key={order.id}
          className="bg-white p-5 rounded-xl shadow border flex flex-col justify-between"
        >
          {/* Top Row */}
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-semibold text-lg">Order #{order.id}</h2>

            <span
              className={`text-xs px-3 py-1 rounded-full font-medium ${
                order.status === "pending"
                  ? "bg-yellow-100 text-yellow-700"
                  : order.status === "delivered" || order.status === "shipped"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
              }`}
            >
              {order.status}
            </span>
          </div>

          {/* User Info */}
          <div className="text-sm text-gray-700 mb-3">
            <p>
              <span className="font-medium">User:</span> {order.user?.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {order.user?.email}
            </p>
          </div>

          {/* Products */}
          <div className="mb-3">
            <p className="font-medium text-sm mb-1">Products:</p>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {order.orderItems.map((item) => (
                <li key={item.id}>
                  {item.product.name} (x{item.quantity})
                </li>
              ))}
            </ul>
          </div>

          {/* Total */}
          <div className="text-right font-semibold mt-auto">
            ₹{order.totalAmt}
          </div>
          <div className="flex items-center justify-center">
            {order.status === "pending" && (
              <button
                className="bg-blue-500 text-white rounded-lg p-2 m-2"
                onClick={() => updateStatus(order.id, "shipped")}
              >
                Ship
              </button>
            )}
            {order.status === "shipped" && (
              <button
                className="bg-green-600 text-white rounded-lg p-2 m-2"
                onClick={() => updateStatus(order.id, "delivered")}
              >
                Deliver
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersAdmin;
