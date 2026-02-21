import mongoose, { Schema, model, models } from "mongoose";

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    roomType: { type: String },
    checkIn: { type: Date },
    status: { type: String, default: "Pending" }, // 'Pending', 'Confirmed', 'Cancelled'
    message: { type: String },
  },
  { timestamps: true },
);

const Enquiry = models.Enquiry || model("Enquiry", EnquirySchema);

export default Enquiry;
