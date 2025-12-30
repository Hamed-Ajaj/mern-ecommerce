import { Response, Router } from "express";
import validate from "express-zod-safe"
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { loginSchema, signupSchema } from "../schemas/auth.schema";
import { db } from "../config/db";
import { User } from "../types/user";
import { RowDataPacket } from "mysql2";
import { StatusCodes } from "http-status-codes";
import { issueAuthCookie } from "../utils/cookies-helper";
import { authMiddleware } from "../middlewares/auth";
import { AuthRequest } from "../types/auth";
const JWT_SECRET = process.env.JWT_SECRET;

const router = Router()

router.post("/login", validate({ body: loginSchema }), async (req, res) => {
  const { email, password } = req.body;

  try {
    const [user] = await db.query<(User & RowDataPacket)[]>(`SELECT * FROM users WHERE email = ?`, [email])

    if (user.length == 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const valid = await bcrypt.compare(password, user[0].password);

    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }


    issueAuthCookie(res, user[0].id)

    res.json({ message: "Logged in" });
  } catch (error) {
    console.error("Login error:", error)

    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
})

router.post("/signup", validate({ body: signupSchema }), async (req, res) => {
  const { email, password, username } = req.body

  try {
    // check if user exists
    const [user] = await db.query<(User & RowDataPacket)[]>(`SELECT * FROM users WHERE email = ?`, [email])
    if (user.length !== 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    const [row] = await db.query(`INSERT INTO users (username,email,password) VALUES (?, ?, ?)`, [username, email, hashedPassword])

    res.status(StatusCodes.CREATED).json({ message: "User created" });
    issueAuthCookie(res, user[0].id)
  } catch (error) {
    // if (error instanceof Error) {
    //   if (error.code === "ER_DUP_ENTRY") {
    //     return res.status(409).json({ message: "User already exists" });
    //   }
    // }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to sign up",
      success: false
    })
  }
})

router.get("/me", authMiddleware, async (req: AuthRequest, res: Response) => {

  if (!req.user) {
    return res.sendStatus(401);
  }

  const userId = req.user.userId;

  const [rows] = await db.query<(User & RowDataPacket)[]>(
    "SELECT id, email, username FROM users WHERE id = ?",
    [userId]
  );

  res.json(rows[0]);
});

export default router
