import { Request } from "express";

export interface AuthPayload {
  userId: number;
}

export interface AuthRequest extends Request {
  user?: {
    userId: number;
  };
}
