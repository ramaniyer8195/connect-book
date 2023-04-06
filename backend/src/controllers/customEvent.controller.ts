import { RequestHandler } from "express";
import customEventModel from "../models/customEvent.model";

export const getEvents: RequestHandler = async (req, res, next) => {
  try {
    const events = await customEventModel.find().exec();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};
