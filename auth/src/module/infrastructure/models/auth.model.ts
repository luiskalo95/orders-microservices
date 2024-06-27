import mongoose from "mongoose";

class AuthModel {
  
  private authSchema: mongoose.Schema;

  constructor() {
    this.authSchema = new mongoose.Schema({
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      refreshToken: {
        type: String,
        required: true,
      },
    });
  }

  get model(): mongoose.Model<mongoose.Document> {
    return mongoose.model("Auth", this.authSchema);
  }
}

export default new AuthModel().model;
