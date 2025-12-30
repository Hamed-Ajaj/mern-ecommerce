import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth"
import productsRoutes from "./routes/products"
dotenv.config()

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes)
app.use("/api/products", productsRoutes)

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
