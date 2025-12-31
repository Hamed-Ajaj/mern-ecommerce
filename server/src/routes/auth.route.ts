import { Router } from "express";
import validate from "express-zod-safe"
import { loginSchema, signupSchema } from "../schemas/auth.schema";
import { authMiddleware } from "../middlewares/auth.middleware";
import { signUpController, logoutController, loginController, profileController } from "../controllers/auth.controller";

const router = Router()

router.post("/login", validate({ body: loginSchema }), loginController)
router.post("/signup", validate({ body: signupSchema }), signUpController)
router.post("/logout", logoutController);
router.get("/me", authMiddleware, profileController);

export default router
