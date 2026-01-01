import { Router } from "express";
import validate from "express-zod-safe";
import { createProductSchema, paramsSchema, querySchema, updateProductSchema } from "../schemas/products.schema";
import { allProductsController, createProductController, deleteProductController, productController, updateProductController } from "../controllers/products.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router()

router.get('/', validate({ query: querySchema }), allProductsController)
router.get('/:id', validate({
  params: paramsSchema
}), productController)
router.post("/", authMiddleware, validate({ body: createProductSchema }), createProductController)
router.put("/:id", authMiddleware, updateProductController)
router.delete("/:id", authMiddleware, deleteProductController)

export default router
