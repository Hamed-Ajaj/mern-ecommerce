import { Router } from "express";
import z from "zod";
import validate from "express-zod-safe";
import { querySchema } from "../schemas/products.schema";
import { allProductsController, createProductController, productController } from "../controllers/products.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()

router.get('/', validate({ query: querySchema }), allProductsController)

router.get('/:id', validate({
  params: z.object({
    id: z.coerce.number()
  })
}), productController)
router.post("/", authMiddleware, createProductController)

export default router
