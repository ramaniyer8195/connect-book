import { InferSchemaType, model, Schema } from "mongoose";

const FamilyModel = new Schema({
  name: { type: String, required: true },
});

type Family = InferSchemaType<typeof FamilyModel>;

export default model<Family>("Family", FamilyModel);
