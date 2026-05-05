import express from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
const prisma = new PrismaClient();

const saltRounds = 10;

import { z } from "zod";

const signupSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(5),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(5),
});

router.post("/signup", async (req, res) => {
  try {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json("Invalid input");
    }
    const { name, email, password } = result.data;
    const checkUser = await prisma.user.findUnique({
      where: { email },
    });
    if (checkUser) {
      return res.status(400).json("User already exists with this email");
    }
    const hashed_password = await bcrypt.hash(password, saltRounds);

    const user = await prisma.user.create({
      data: { name: name, email: email, password: hashed_password },
    });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
    );
    return res.json({
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json("Invalid input");
    }
    const { email, password } = result.data;
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(400).json("Invalid credentials");
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json("Invalid credentials");
    }
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
    );

    return res.json({
      token: token,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
