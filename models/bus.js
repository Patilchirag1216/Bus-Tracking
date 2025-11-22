import mongoose from "mongoose";

const busSchema = new mongoose.Schema({
  routeName: {
    type: String,
    required: true, // e.g. "City Center to Railway Station"
  },
  busNo: {
    type: String,
    required: true, // e.g. "MH54 B 2023"
    unique: true,
  },
  timing: {
    type: String,
    required: true, // e.g. "9:00 AM - 11:00 AM"
  },
  conductorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // links to conductor from user collection
    default: null,
  },
  isOccupied: {
    type: Boolean,
    default: false,
  },
  location: {
    lat: { type: Number, default: null },
    lng: { type: Number, default: null },
  },
});

export default mongoose.model("Bus",busSchema);