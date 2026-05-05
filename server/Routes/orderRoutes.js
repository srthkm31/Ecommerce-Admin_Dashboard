import express from "express";
import { PrismaClient } from "@prisma/client";
import { routeProtect } from "../middlewares/authMiddleware.js";
import { adminCheck } from "../middlewares/adminMiddleware.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/", routeProtect, async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body;
    if (!userId || !items || items.length == 0) {
      res.status(500).json("Check userID and item carefully");
    }
    let totalAmt = 0;
    for (let item of items) {
      const product = await prisma.product.findUnique({
        where: {
          id: item.productId,
        },
      });
      if (!product) {
        return res.json("No such product");
      }
      totalAmt += product.price * item.quantity;
    }
    const order = await prisma.order.create({
      data: { userId, totalAmt },
    });

    for (let item of items) {
      await prisma.orderItem.create({
        data: {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
        },
      });
    }
    res.json("Order created Successfully");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", routeProtect, adminCheck, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/allOrders", routeProtect, async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.user.id },
      orderBy: {
        id: "asc",
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:orderId", routeProtect, async (req, res) => {
  try {
    const id = req.params.orderId;
    const order = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!order) {
      return res.status(404).json({ message: "No order" });
    }
    if (req.user.role !== "ADMIN" && order.userId !== req.user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:orderId", routeProtect, adminCheck, async (req, res) => {
  try {
    const id = Number(req.params.orderId);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid order ID" });
    }
    const status = req.body.status;
    if (!status) {
      return res.status(400).json("Status field required");
    }
    const order = await prisma.order.update({
      where: { id: id },
      data: { status: status },
    });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
