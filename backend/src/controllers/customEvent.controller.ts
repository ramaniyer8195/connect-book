import { RequestHandler } from "express";
import customEventModel from "../models/customEvent.model";
import { CreateCustomEventBody } from "../interfaces/customEvent.interface";
import createHttpError from "http-errors";
import { HTTP_CODES } from "../helper/constants";

export const getEvents: RequestHandler = async (req, res, next) => {
  const { userId } = req.session;

  try {
    const events = await customEventModel.find({ user: userId }).exec();
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export const createCustomEvent: RequestHandler<
  unknown,
  unknown,
  CreateCustomEventBody,
  unknown
> = async (req, res, next) => {
  const { events } = req.body;
  const { userId } = req.session;

  try {
    const newEvents = [];
    const customEvents = (
      await customEventModel.find({ user: userId }).exec()
    ).map((event) => event.eventName);
    for (const event of events) {
      if (!event) {
        throw createHttpError(HTTP_CODES.BAD_REQUEST, "Parameters missing");
      }
      if (customEvents.includes(event)) {
        throw createHttpError(
          HTTP_CODES.CONFLICT,
          `Event:- ${event} already exists`
        );
      }

      newEvents.push({
        user: userId,
        eventName: event,
      });
    }
    const createEvents = await customEventModel.insertMany(newEvents);

    res.status(HTTP_CODES.CREATED).json(createEvents);
  } catch (error) {
    next(error);
  }
};
