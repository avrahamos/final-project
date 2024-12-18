import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import "dotenv/config";
import analysisRouter from './routers/analysisRouter'
import relationshipsRouter from './routers/relationshipsRouter'

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/analysis/" , analysisRouter);
app.use("/api/relationships/", relationshipsRouter);

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).send("pong");
});

app.listen(PORT, () => {
  console.log(`   server up and run visit at http://localhost:${PORT}`);
});
