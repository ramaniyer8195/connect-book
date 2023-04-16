import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import { HTTP_CODES } from "./helper/constants";
import session from "express-session";
import env from "./helper/validateEnv";
import MongoStore from "connect-mongo";

// routes
import userRoutes from "./routes/user.routes";
import contactRoutes from "./routes/contact.routes";
import standardEventRoutes from "./routes/standardEvent.routes";
import customEventRoutes from "./routes/customEvent.routes";
import familyRoutes from "./routes/family.routes";

// initialize express
const app = express();

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_URI,
    }),
  })
);

// routes
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/standardEvents", standardEventRoutes);
app.use("/api/customEvents", customEventRoutes);
app.use("/api/family", familyRoutes);

// 404 handling
app.use((req, res, next) => {
  next(createHttpError(HTTP_CODES.NOT_FOUND, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error(error);
  let errorMessage = "An unkown error occured";
  let statusCode = HTTP_CODES.INTERNAL_SERVER_ERROR;
  if (isHttpError(error)) {
    statusCode = error.statusCode;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
