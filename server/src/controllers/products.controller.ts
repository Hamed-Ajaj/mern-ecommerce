import { Request, Response } from "express";
import { db } from "../config/db";
import { Product } from "../types/product";
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { StatusCodes } from "http-status-codes";

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
  try {
    const { id } = req.params
    const { name, description, price, image_url } = req.body


    const [rows] = await db.query<any[]>(
      "SELECT image_url FROM products WHERE id = ?",
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
        SET name = ?, description = ?, price = ?, image_url = ?
        WHERE id = ?
        `,
      [name, description, price, image_url, id]
    )

    return res.sendStatus(StatusCodes.NO_CONTENT)
  } catch (error) {
    console.error("Update product error:", error)

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error,
      success: false,
    })
  }
}





