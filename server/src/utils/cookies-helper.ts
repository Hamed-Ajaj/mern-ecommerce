
import jwt from "jsonwebtoken";
import { Response } from "express";

export function issueAuthCookie(res: Response, userId: number) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  const token = jwt.sign(
    { userId },
    secret,
    { expiresIn: "1h" }
  );

  res.cookie("access_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 1000,
  });
}
