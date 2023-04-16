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
    primaryNumber: { type: String, required: true },
    secondaryNumbers: [{ type: String }],
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
      },
    ],
    favorite: { type: Boolean, default: false },
    family: { type: Schema.Types.ObjectId, ref: "Family" },
  },
  { timestamps: true }
);

type Contact = InferSchemaType<typeof contactModel>;

export default model<Contact>("Contact", contactModel);
