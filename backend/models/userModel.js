import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  files: [
    {
      fileName: { type: String },
      type: { type: String },
      size: { type: String },
      fileUrl: { type: String },
      uploadedAt: { type: Date, default: Date.now }
    }
  ]
});

mongoose.models.User && delete mongoose.models.User;

const userModel = mongoose.model('User', userSchema);

export default userModel;
