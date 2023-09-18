import mongoose from "mongoose";

const repoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    HTML: {
      type: String,
    },
    CSS: {
      type: String,
    },
    JS: {
      type: String,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", 
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Repo", repoSchema);
