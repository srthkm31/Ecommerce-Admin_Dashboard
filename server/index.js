import dotenv from "dotenv";
dotenv.config();

import express from "express";
import productRoutes from "./Routes/productRoutes.js";
import orderRoutes from "./Routes/orderRoutes.js";
import userRoutes from "./Routes/userRoutes.js";
import cors from "cors";
import dashboardRoute from "./Routes/dashboardRoute.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/users", userRoutes);
app.use("/api/dashboard", dashboardRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
