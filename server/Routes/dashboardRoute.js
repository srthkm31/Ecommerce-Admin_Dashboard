import express from "express";
import { PrismaClient } from "@prisma/client";
import { adminCheck } from "../middlewares/adminMiddleware.js";
import { routeProtect } from "../middlewares/authMiddleware.js";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", routeProtect, adminCheck, async (req, res) => {
  try {
    const products = await prisma.product.count();
    const orders = await prisma.order.count();
    const aggregations = await prisma.order.aggregate({
      _sum: { totalAmt: true },
    });
    res.json({
      totalProducts: products,
      totalOrders: orders,
      totalRevenue: aggregations._sum.totalAmt || 0,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
