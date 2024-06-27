import mongoose from "mongoose";

class DeliveryModel {
  
  private deliverySchema: mongoose.Schema;

  constructor() {
    this.deliverySchema = new mongoose.Schema({
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
    return mongoose.model("Delivery", this.deliverySchema);
  }
}

export default new DeliveryModel().model;
