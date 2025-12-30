import { Router } from "express";
import validate from "express-zod-safe"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { authSchema } from "../schemas/auth.schema";
import { db } from "../config/db";
import { User } from "../types/user";
import { RowDataPacket } from "mysql2";
const JWT_SECRET = process.env.JWT_SECRET;

const router = Router()

router.post("/login", validate({ body: authSchema }), async (req, res) => {
  const { username, email, password } = req.body;

  const [user] = await db.query<(User & RowDataPacket)[]>(`SELECT * FROM users WHERE email = ? OR username = ?`, [email, username])

  if (user.length == 0) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const valid = await bcrypt.compare(password, user[0].password);

  if (!valid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user[0].id },
    JWT_SECRET!,
    { expiresIn: "1h" }
  );

  res.json({ token });
})

router.post("/signup", validate({ body: authSchema }), async (req, res) => {
  const { email, password, username } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: "Missing fields" });
  }

  // check if user exists
  const [user] = await db.query<(User & RowDataPacket)[]>(`SELECT * FROM users WHERE email = ?`, [email])
  if (user.length !== 0) {
    return res.status(409).json({ message: "User already exists" });
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 12);
  const [row] = await db.query(`INSERT INTO users (username,email,password) VALUES (?, ?, ?)`, [username, email, hashedPassword])

  res.status(201).json({ message: "User created" });
})


export default router
