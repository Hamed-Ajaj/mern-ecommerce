import { Response, NextFunction } from "express";
import { RowDataPacket } from "mysql2";
import { db } from "../config/db";
import { AuthRequest } from "../types/auth";

export async function adminMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.sendStatus(401);
  }

  try {
    const [rows] = await db.query<(RowDataPacket & { role: string })[]>(
      "SELECT role FROM users WHERE id = ?",
      [req.user.userId]
    );

    if (rows.length === 0) {
      return res.sendStatus(403);
    }

    if (rows[0].role !== "admin") {
      return res.sendStatus(403);
    }

    next();
  } catch {
    return res.sendStatus(500);
  }
}
