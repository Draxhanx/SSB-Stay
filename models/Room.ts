import mongoose, { Schema, model, models } from "mongoose";

const RoomSchema = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true }, // 'Single', 'Shared'
    price: { type: Number, required: true },
    amenities: [{ type: String }],
    description: { type: String },
    availability: { type: Boolean, default: true },
    image: { type: String }, // URL
  },
  { timestamps: true },
);

const Room = models.Room || model("Room", RoomSchema);

export default Room;
