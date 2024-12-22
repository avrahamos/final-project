import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import analysisRouter from './routers/analysisRouter'
import relationshipsRouter from './routers/relationshipsRouter'

dotenv.config()

const PORT = process.env.PORT || 3000;

const app = express();

const httpServer = http.createServer(app);

export const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: "*",
  },
});

io.on("connection", (client) => {
  console.log(`New socket connection: ${client.id}`);
  client.on("disconnect", () => {
    console.log(`Client disconnected: ${client.id}`);
  });
});

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
