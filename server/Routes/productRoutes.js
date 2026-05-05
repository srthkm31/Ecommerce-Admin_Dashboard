import express from "express";
import { PrismaClient } from "@prisma/client";
import { routeProtect } from "../middlewares/authMiddleware.js";
import { adminCheck } from "../middlewares/adminMiddleware.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", routeProtect, adminCheck, async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const product = await prisma.product.create({
      data: { name, price, stock },
    });
    res.json(product);
  } catch (error) {
    console.error("ERROR:", error);
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const name = req.query.name;
    if (!name) {
      return res.status(400).json({ message: "Name field missing" });
    }
    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: name,
          mode: "insensitive",
        },
      },
    });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
