import { Router } from "express";
import { getUsersController } from "../controllers/users.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/admin.middleware";

const router = Router();

router.get("/", authMiddleware, adminMiddleware, getUsersController);

export default router;
