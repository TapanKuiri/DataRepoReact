import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
  {
    fileName: { type: String, required: true },
    size: { type: String, required: true },
    fileUrl: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now }
  },
     
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },  // trim remove leading/trailing spaces
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    files: [fileSchema]
  },
  { timestamps: true } // Automatically manage 'createdAt' and 'updatedAt' fields
);

// Avoid OverwriteError in dev (use this only in development)
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;


 