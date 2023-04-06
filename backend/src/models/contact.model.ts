import { InferSchemaType, Schema, model } from "mongoose";

const contactModel = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    nickName: { type: String },
    addressLine1: { type: String },
    addressLine2: { type: String },
    pincode: { type: Number },
    primaryNumber: {
      phone: { type: String, required: true },
    },
    secondaryNumbers: [
      {
        phone: { type: String },
      },
    ],
    emails: [
      {
        emailId: { type: String },
        isPrimary: { type: Boolean },
      },
    ],
    websites: [
      {
        websiteName: { type: String },
        isPrimary: { type: Boolean },
      },
    ],
    standardEvents: [
      {
        event: {
          type: Schema.Types.ObjectId,
          ref: "StandardEvent",
          required: true,
        },
        date: { type: Date, required: true },
        isReminded: { type: Boolean },
      },
    ],
    customEvents: [
      {
        event: {
          type: Schema.Types.ObjectId,
          ref: "CustomEvent",
          required: true,
        },
        date: { type: Date, required: true },
        isReminded: { type: Boolean },
      },
    ],
  },
  { timestamps: true }
);

type Contact = InferSchemaType<typeof contactModel>;

export default model<Contact>("Contact", contactModel);
