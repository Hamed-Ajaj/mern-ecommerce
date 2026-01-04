import { Request, Response } from "express";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { db } from "../config/db";
import { issueAuthCookie } from "../utils/cookies-helper";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt"
import { User } from "../types/user";
import { AuthRequest } from "../types/auth";

const JWT_SECRET = process.env.JWT_SECRET;

export const loginController = async (req: Request, res: Response) => {
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
}
export const signUpController = async (req: Request, res: Response) => {
  const { email, password, username } = req.body

  try {
    // check if user exists
    const [user] = await db.query<(User & RowDataPacket)[]>(`SELECT * FROM users WHERE email = ?`, [email])
    if (user.length !== 0) {
      return res.status(409).json({ message: "User already exists" });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    const [row] = await db.query<ResultSetHeader>(`INSERT INTO users (username,email,password) VALUES (?, ?, ?)`, [username, email, hashedPassword])

    issueAuthCookie(res, row.insertId)
    res.status(StatusCodes.CREATED).json({ message: "User created" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to sign up",
      success: false
    })
  }
}

export const logoutController = (_: Request, res: Response) => {
  res.clearCookie("access_token");
  res.sendStatus(204);
}

export const profileController = async (req: AuthRequest, res: Response) => {

  if (!req.user) {
    return res.sendStatus(401);
  }

  const userId = req.user.userId;
  try {
    const [rows] = await db.query<(User & RowDataPacket)[]>(
      "SELECT id, email, username, role FROM users WHERE id = ?",
      [userId]
    );

    res.json(rows[0]);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to get user",
      success: false
    })
  }

}

