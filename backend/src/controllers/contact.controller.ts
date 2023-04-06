import { RequestHandler } from "express";
import contactModel from "../models/contact.model";

export const getContacts: RequestHandler = async (req, res, next) => {
  try {
    const contacts = await contactModel.find().exec();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};
