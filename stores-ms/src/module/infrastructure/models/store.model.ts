import mongoose from "mongoose";

class StoreModel {
  private storeSchema: mongoose.Schema;

  constructor() {
    this.storeSchema = new mongoose.Schema({
      userId: {
        type: String,
        required: true,
      },
      productId: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
        trim: true,
      },
      itemCount: {
        type: Number,
        required: true,
      },
      transaction: {
        type: String,
        required: true,
      },
      status: {
        type: String,
        required: true,
      },
    });
  }

  get model(): mongoose.Model<mongoose.Document> {
    return mongoose.model("Store", this.storeSchema);
  }
}

export default new StoreModel().model;
