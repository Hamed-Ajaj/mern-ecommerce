import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route";
import productsRoutes from "./routes/products.route";
import usersRoutes from "./routes/users.route";
dotenv.config()

export const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE", "PUT"],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/users", usersRoutes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});
