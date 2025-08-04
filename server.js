import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./database/connectDb.js";
import router from "./routes/mainRoute.js";
import { handleError } from './utils/errorHandler.js';

//connect to database
connectDB();

const app = express();


// router
app.use(cors({ origin: "*", credentials: true}));
//  Body parsing middleware for JSON
app.use(express.json());

//If sending data from HTML forms
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", router);
const port = 8080;

app.listen(port, () => console.log(`Server running on mode on port ${port}`));
app.use(handleError);