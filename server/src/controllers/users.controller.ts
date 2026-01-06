import { RowDataPacket } from "mysql2";
import { db } from "../config/db";
import { User } from "../types/user";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const sql = `SELECT * FROM users`;
    const [rows] = await db.query<(User & RowDataPacket)[]>(
      sql,
    );

    res.status(StatusCodes.OK).json({
      users: rows,
      success: true,
    });
  } catch (error) {

    console.error("Error fetching users:", error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch users",
      success: false
    });
  }
};
