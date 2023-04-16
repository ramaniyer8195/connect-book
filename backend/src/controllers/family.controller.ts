import { RequestHandler } from "express";
import familyModel from "../models/family.model";

export const getFamily: RequestHandler = async (req, res, next) => {
  try {
    const family = await familyModel.find().exec();
    res.status(200).json(family);
  } catch (error) {
    next(error);
  }
};
