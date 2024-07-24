import { Schema, model } from "mongoose";

const requestSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
    },
  },
  { timestamps: true }
);

const Request = model("Request", requestSchema);
export default Request;
