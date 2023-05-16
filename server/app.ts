import express from "express";
import { json } from "body-parser";
import { appRouter } from "./routes/routes";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from 'cors'

const app = express();
app.use(cors())
app.use(json());
app.use(appRouter);

mongoose.connect(`mongodb+srv://${process.env.MDB_USER}:${process.env.MDB_PASSWORD}@cluster0.rcnu4pz.mongodb.net/weather`)

export default app;
