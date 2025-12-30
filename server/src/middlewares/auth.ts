import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../types/auth";

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const token = req.cookies.access_token;
  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    );

    if (typeof decoded !== "object" || !("userId" in decoded)) {
      return res.sendStatus(401);
    }

    req.user = { userId: decoded.userId as number };
    next();
  } catch {
    return res.sendStatus(401);
  }
}
