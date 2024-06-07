import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";

async function checkDbConnection() {
    try {
      await mongoose.connect(process.env.MONGO_URI as string);
      console.log(process.env.MONGO_URI);
    } catch (error) {
      console.error('Database connection error:', error);
    }
  }
  checkDbConnection();

  const corsOptions = {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  };

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

app.get("/api/test", async (req: Request, res: Response) => {
    res.json({message: "hello from express endpoint"});
});

app.listen(7000, () => {
    console.log("server running on localhost:7000");
  });