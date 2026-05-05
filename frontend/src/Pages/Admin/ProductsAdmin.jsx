import React, { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ProductsAdmin = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  return (
    <div className=" bg-white p-6 rounded-xl ">
      <h2 className="text-xl font-semibold mb-2">Create New Product</h2>
      <p className="text-sm text-gray-500 mb-4">Enter product details below</p>

      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Product Name"
          className="border border-neutral-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />

        <input
          type="number"
          placeholder="Price"
          className="border border-neutral-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />

        <input
          type="number"
          placeholder="Stock Quantity"
          className="border border-neutral-400 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          onChange={(e) => {
            setStock(e.target.value);
          }}
        />

        <button
          className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
          onClick={async () => {
            try {
              const token = localStorage.getItem("token");
              const response = await axios.post(
                "http://localhost:5000/api/products",
                {
                  name: name,
                  price: Number(price),
                  stock: Number(stock),
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
              alert("Product created successfully");
              window.location.reload();
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default ProductsAdmin;
