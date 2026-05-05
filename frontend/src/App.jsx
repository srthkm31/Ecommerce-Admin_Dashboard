import React from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Products from "./Pages/Products";
import { Login } from "./Pages/Login";
import { Signup } from "./Pages/Signup";
import Orders from "./Pages/Orders";
import Dashboard from "./Pages/Admin/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
