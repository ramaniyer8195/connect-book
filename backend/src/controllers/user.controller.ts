import { RequestHandler } from "express";
import userModel from "../models/user.model";

export const getUsers: RequestHandler = async (req, res, next) => {
  try {
    const users = await userModel.find().exec();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};
