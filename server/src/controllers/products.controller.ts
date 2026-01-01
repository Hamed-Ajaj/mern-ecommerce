import { Request, RequestHandler, Response } from "express";
import { db } from "../config/db";
import { Product } from "../types/product";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { StatusCodes } from "http-status-codes";
import { paramsSchema, updateProductSchema } from "../schemas/products.schema";

export const allProductsController = async (req: Request, res: Response) => {
  const { search, order, sort } = req.query;

  try {
    let sql = "SELECT * FROM products"
    const params: any[] = []

    if (search) {
      sql += " WHERE name LIKE ? OR description LIKE ?"
      params.push(`%${search}%`, `%${search}%`)
    }

    if (sort === "price") {
      sql += ` ORDER BY price ${order}`
    } else {
      sql += ` ORDER BY created_at ${order}`
    }

    const [rows] = await db.query<(Product & RowDataPacket)[]>(
      sql,
      params
    )

    res.status(StatusCodes.OK).json({
      products: rows,
      success: true,
    })
  }
  catch (error) {
    console.error("Error fetching products:", error)

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch products",
      success: false
    })
  }

}

type ProductParams = {
  id: number;
};

export const productController = async (req: Request<ProductParams>, res: Response) => {
  try {
    const { id } = req.params;
    const sql = 'SELECT * FROM products WHERE id = ?';
    const [rows] = await db.query<(Product & RowDataPacket)[]>(sql, [id]);

    if (rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Product not found",
        success: false,
      })
    }
    res.json({ product: rows[0], success: true })
  }
  catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to fetch product",
      success: false
    })
  }
}

export const createProductController = async (req: Request, res: Response) => {
  const { title, description, price, image_url } = req.body;

  try {
    const sql = 'INSERT INTO products (title, description, price, image_url) VALUES (?, ?, ?, ?)';
    const result = await db.query(sql, [title, description, price, image_url]);
    res.status(StatusCodes.CREATED).json({ message: "product created succesfully", success: true })
  }
  catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
      success: false
    })
  }
}

type UpdateProductBody = {
  title: string;
  description?: string;
  price: number;
  image_url?: string;
};

export const updateProductController = async (req: Request, res: Response) => {
  try {
    const { id } = paramsSchema.parse(req.params)
    const { title, description, price, image_url } = updateProductSchema.parse(req.body)

    if (!id) {
      res.status(StatusCodes.BAD_REQUEST)
    }

    const [rows] = await db.query<any[]>(
      "SELECT * FROM products WHERE id = ?",
      [id]
    )

    if (rows.length === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Product not found",
        success: false,
      })
    }

    const [result] = await db.query<ResultSetHeader>(
      `
        UPDATE products
        SET title = ?, description = ?, price = ?, image_url = ?
        WHERE id = ?
        `,
      [title, description, price, image_url, id]
    )

    if (result.affectedRows === 0) {
      return res.sendStatus(StatusCodes.NO_CONTENT).json({
        message: "nothing changed",
        success: true
      });
    }

    return res.sendStatus(StatusCodes.NO_CONTENT)
  } catch (error) {
    console.error("Update product error:", error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
      success: false,
    })
  }
}

export const deleteProductController = async (req: Request, res: Response) => {
  const { id } = paramsSchema.parse(req.params)
  try {
    const sql = 'DELETE FROM products WHERE id = ?';
    const [result] = await db.query<ResultSetHeader>(sql, [id]);

    if (result.affectedRows === 0) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Product not found",
        success: false,
      })
    }

    res.status(StatusCodes.OK).json({ message: "product deleted", success: true })
  }
  catch {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Failed to Delete product",
      success: false
    })
  }
}
