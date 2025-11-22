// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// export default mongoose.model("User", userSchema);


import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  access: { type: String, enum: ["user", "conductor","admin"], default: "user" },
   busId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bus",
    default: null,
  },
});

export default mongoose.model("User", userSchema);

