import { InferSchemaType, Schema, model } from "mongoose";

const customEventSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  eventName: { type: String, required: true },
});

type CustomEvent = InferSchemaType<typeof customEventSchema>;

export default model<CustomEvent>("CustomEvent", customEventSchema);
