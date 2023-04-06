import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
// routes

import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

// initialize express
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());

// routes

// 404 handling
app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unkown error occured";
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
