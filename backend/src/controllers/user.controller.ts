import { RequestHandler } from "express";
import userModel from "../models/user.model";
import {
  GetUserParams,
  LoginUserBody,
  RemoveUserParams,
  SignupUserBody,
} from "../interfaces/user.interface";
import mongoose from "mongoose";
import createHttpError from "http-errors";
import { HTTP_CODES } from "../helper/constants";
import bcrypt from "bcrypt";
import { omit } from "lodash";

export const getAuthUser: RequestHandler = async (req, res, next) => {
  const { userId } = req.session;

  try {
    if (!userId) {
      throw createHttpError(HTTP_CODES.UNAUTHORIZED, "User not authenticated");
    }

    const user = await userModel.findById(userId).select("+emailId").exec();

    res.status(HTTP_CODES.SUCCESS).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUser: RequestHandler<
  GetUserParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { userId } = req.params;

  try {
    if (!mongoose.isValidObjectId(userId)) {
      throw createHttpError(HTTP_CODES.BAD_REQUEST, "Invalid User Id");
    }
    const user = await userModel.findById(userId).exec();
    if (!user) {
      throw createHttpError(HTTP_CODES.NOT_FOUND, "User not found");
    }

    res.status(HTTP_CODES.SUCCESS).json(user);
  } catch (error) {
    next(error);
  }
};

export const signup: RequestHandler<
  unknown,
  unknown,
  SignupUserBody,
  unknown
> = async (req, res, next) => {
  const { name, phone, emailId, username, password: passwordRaw } = req.body;

  try {
    if (!name || !phone || !emailId || !username || !passwordRaw) {
      throw createHttpError(HTTP_CODES.BAD_REQUEST, "Parameters missing");
    }

    const existingUser = await userModel
      .aggregate([{ $match: { $or: [{ username }, { emailId }, { phone }] } }])
      .exec();

    if (existingUser.length) {
      const user = existingUser[0];
      if (user.emailId === emailId) {
        throw createHttpError(
          HTTP_CODES.CONFLICT,
          "Email Id already registered, please choose a different one or login instead"
        );
      }
      if (user.username === username) {
        throw createHttpError(
          HTTP_CODES.CONFLICT,
          "Username already taken, please choose a different one or login instead"
        );
      }
      if (user.phone === phone) {
        throw createHttpError(
          HTTP_CODES.CONFLICT,
          "Phone already registered, please choose a different one or login instead"
        );
      }
    }

    const passwordHashed = await bcrypt.hash(passwordRaw, 10);
    const newUser = await userModel.create({
      name,
      phone,
      emailId,
      username,
      password: passwordHashed,
    });

    req.session.userId = newUser._id;

    res.status(HTTP_CODES.CREATED).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const login: RequestHandler<
  unknown,
  unknown,
  LoginUserBody,
  unknown
> = async (req, res, next) => {
  const { username, password: passwordRaw } = req.body;

  try {
    if (!username || !passwordRaw) {
      throw createHttpError(HTTP_CODES.BAD_REQUEST, "Parameters missing");
    }

    const user = await userModel
      .findOne({ username })
      .select("+password +emailId")
      .exec();
    if (!user) {
      throw createHttpError(HTTP_CODES.UNAUTHORIZED, "Invalid credentials");
    }

    const passwordMatch = await bcrypt.compare(passwordRaw, user.password);
    if (!passwordMatch) {
      throw createHttpError(HTTP_CODES.UNAUTHORIZED, "Invalid credentials");
    }

    req.session.userId = user._id;

    res.status(HTTP_CODES.SUCCESS).json(omit(user.toObject(), ["password"]));
  } catch (error) {
    next(error);
  }
};

export const logout: RequestHandler = async (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      next(error);
    } else {
      res.sendStatus(HTTP_CODES.SUCCESS);
    }
  });
};

export const removeUser: RequestHandler<
  RemoveUserParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { userId } = req.params;

  try {
    if (!mongoose.isValidObjectId(userId)) {
      throw createHttpError(HTTP_CODES.BAD_REQUEST, "Invalid User Id");
    }
    const user = await userModel.findById(userId).exec();
    if (!user) {
      throw createHttpError(HTTP_CODES.NOT_FOUND, "User not found");
    }
    await userModel.findByIdAndRemove(user._id).exec();

    res.sendStatus(HTTP_CODES.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};
