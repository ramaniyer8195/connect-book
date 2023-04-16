import { RequestHandler } from "express";
import contactModel from "../models/contact.model";
import {
  ContactParams,
  ContactBody,
  GetEventParams,
  Event,
} from "../interfaces/contact.interface";
import mongoose from "mongoose";

import createHttpError from "http-errors";
import { HTTP_CODES } from "../helper/constants";

export const getContacts: RequestHandler = async (req, res, next) => {
  const { userId } = req.session;

  try {
    const contacts = await contactModel
      .find({ user: new mongoose.Types.ObjectId(userId) })
      .exec();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

export const getContact: RequestHandler<
  ContactParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    if (!mongoose.isValidObjectId(contactId)) {
      throw createHttpError(HTTP_CODES.BAD_REQUEST, "Invalid Contact Id");
    }

    const contact = await contactModel.findById(contactId).exec();
    if (!contact) {
      throw createHttpError(HTTP_CODES.NOT_FOUND, "Contact not found");
    }

    res.status(HTTP_CODES.SUCCESS).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateContact: RequestHandler<
  ContactParams,
  unknown,
  ContactBody,
  unknown
> = async (req, res, next) => {
  const { userId: user } = req.session;
  const { contactId } = req.params;
  const {
    firstName,
    lastName,
    nickName,
    addressLine1,
    addressLine2,
    pincode,
    primaryNumber,
    secondaryNumbers,
    emails,
    websites,
    standardEvents,
    customEvents,
    favorite,
    family,
  } = req.body;

  try {
    if (!user || !firstName || !primaryNumber || !favorite) {
      throw createHttpError(HTTP_CODES.BAD_REQUEST, "Parametes missing");
    }

    if (!mongoose.isValidObjectId(contactId)) {
      throw createHttpError(HTTP_CODES.BAD_REQUEST, "Invalid Contact Id");
    }
    if (!mongoose.isValidObjectId(user)) {
      throw createHttpError(HTTP_CODES.BAD_REQUEST, "Invalid User Id");
    }
    if (standardEvents?.length) {
      standardEvents.forEach((standardEvent) => {
        if (!mongoose.isValidObjectId(standardEvent.event)) {
          throw createHttpError(HTTP_CODES.BAD_REQUEST, "Invalid Event Id");
        }
      });
    }
    if (customEvents?.length) {
      customEvents.forEach((customEvent) => {
        if (!mongoose.isValidObjectId(customEvent.event)) {
          throw createHttpError(HTTP_CODES.BAD_REQUEST, "Invalid Event Id");
        }
      });
    }
    if (family && !mongoose.isValidObjectId(family)) {
      throw createHttpError(HTTP_CODES.BAD_REQUEST, "Invalid Family Id");
    }

    const contact = await contactModel.findById(contactId).exec();
    if (!contact) {
      throw createHttpError(HTTP_CODES.NOT_FOUND, "Contact not found");
    }

    contact.user = user;
    contact.firstName = firstName;
    contact.lastName = lastName;
    contact.nickName = nickName;
    contact.addressLine1 = addressLine1;
    contact.addressLine2 = addressLine2;
    contact.pincode = pincode;
    contact.primaryNumber = primaryNumber;
    contact.secondaryNumbers = secondaryNumbers || [];
    contact.emails = emails || [];
    contact.websites = websites || [];
    contact.standardEvents = standardEvents || [];
    contact.customEvents = customEvents || [];
    contact.favorite = favorite || false;
    contact.family = family;

    const updatedContact = await contact.save();

    res.status(HTTP_CODES.CREATED).json(updatedContact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact: RequestHandler<
  ContactParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    if (!mongoose.isValidObjectId(contactId)) {
      throw createHttpError(HTTP_CODES.BAD_REQUEST, "Invalid Contact Id");
    }

    const contact = await contactModel.findById(contactId).exec();
    if (!contact) {
      throw createHttpError(HTTP_CODES.NOT_FOUND, "Contact not found");
    }
    await contactModel.findByIdAndRemove(contact._id).exec();

    res.sendStatus(HTTP_CODES.NO_CONTENT);
  } catch (error) {
    next(error);
  }
};

export const createContact: RequestHandler<
  unknown,
  unknown,
  ContactBody,
  unknown
> = async (req, res, next) => {
  const { userId: user } = req.session;
  const {
    firstName,
    lastName,
    nickName,
    addressLine1,
    addressLine2,
    pincode,
    primaryNumber,
    secondaryNumbers,
    emails,
    websites,
    standardEvents,
    customEvents,
    favorite,
    family,
  } = req.body;

  try {
    if (!user || !firstName || !primaryNumber || !favorite) {
      throw createHttpError(HTTP_CODES.BAD_REQUEST, "Parametes missing");
    }

    if (!mongoose.isValidObjectId(user)) {
      throw createHttpError(HTTP_CODES.BAD_REQUEST, "Invalid User Id");
    }
    if (standardEvents?.length) {
      standardEvents.forEach((standardEvent) => {
        if (!mongoose.isValidObjectId(standardEvent.event)) {
          throw createHttpError(HTTP_CODES.BAD_REQUEST, "Invalid Event Id");
        }
      });
    }
    if (customEvents?.length) {
      customEvents.forEach((customEvent) => {
        if (!mongoose.isValidObjectId(customEvent.event)) {
          throw createHttpError(HTTP_CODES.BAD_REQUEST, "Invalid Event Id");
        }
      });
    }
    if (family && !mongoose.isValidObjectId(family)) {
      throw createHttpError(HTTP_CODES.BAD_REQUEST, "Invalid Family Id");
    }

    const newContact = await contactModel.create({
      user,
      firstName,
      lastName,
      nickName,
      addressLine1,
      addressLine2,
      pincode,
      primaryNumber,
      secondaryNumbers,
      emails,
      websites,
      standardEvents,
      customEvents,
      favorite,
      family,
    });

    res.status(HTTP_CODES.CREATED).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const getFavorites: RequestHandler = async (req, res, next) => {
  const { userId } = req.session;
  try {
    const favorites = await contactModel
      .find({ $and: [{ user: userId }, { favorite: true }] })
      .exec();
    res.status(HTTP_CODES.SUCCESS).json(favorites);
  } catch (error) {
    next(error);
  }
};

export const getUpcomingEvents: RequestHandler<
  GetEventParams,
  unknown,
  unknown,
  unknown
> = async (req, res, next) => {
  const { month } = req.params;
  const { userId } = req.session;
  // try {
  //   const contactsWithEvents = await contactModel
  //     .find({
  //       user: userId,
  //       standardEvents: {
  //         $elemMatch: {
  //           date: {
  //             $eq: {{$month: "$date"}, month},
  //           },
  //         },
  //       },
  //       customEvents: {
  //         $elemMatch: {
  //           date: {
  //             $gte: new Date("1995-01-01T00:00:00.000Z"),
  //             $lt: new Date("1995-02-01T00:00:00.000Z"),
  //           },
  //         },
  //       },
  //     })
  //     .exec();
  //   console.log(JSON.stringify(contactsWithEvents));
  //   res.status(HTTP_CODES.SUCCESS).json({});
  // } catch (error) {
  //   next(error);
  // }
};

export const getContactCount: RequestHandler = async (req, res, next) => {
  const { userId } = req.session;

  try {
    const count = await contactModel
      .aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
          },
        },
        {
          $count: "contact",
        },
      ])
      .exec();

    res.status(HTTP_CODES.SUCCESS).json(count);
  } catch (error) {
    next(error);
  }
};

export const getFavoriteCount: RequestHandler = async (req, res, next) => {
  const { userId } = req.session;

  try {
    const count = await contactModel
      .aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
            favorite: true,
          },
        },
        {
          $count: "favorite",
        },
      ])
      .exec();

    res.status(HTTP_CODES.SUCCESS).json(count);
  } catch (error) {
    next(error);
  }
};

export const getFamilyCount: RequestHandler = async (req, res, next) => {
  const { userId } = req.session;

  try {
    const count = await contactModel
      .aggregate([
        {
          $match: {
            user: new mongoose.Types.ObjectId(userId),
            family: { $exists: true },
          },
        },
        {
          $count: "family",
        },
      ])
      .exec();

    res.status(HTTP_CODES.SUCCESS).json(count);
  } catch (error) {
    next(error);
  }
};
