import { InferSchemaType, Schema, model } from "mongoose";

const standardEventSchema = new Schema({
  eventName: { type: String, required: true },
});

type StandardEvent = InferSchemaType<typeof standardEventSchema>;

export default model<StandardEvent>("StandardEvent", standardEventSchema);
