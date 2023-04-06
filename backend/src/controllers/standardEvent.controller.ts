import { RequestHandler } from "express";
import standardEventModel from "../models/standardEvent.model";

export const getEvents: RequestHandler = async (req, res, next) => {
  try {
    const events = await standardEventModel.find().exec();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};
