const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PaymentSchema = new Schema(
  {
    nameOrder: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    cart: {
      type: Array,
      default: [],
    },
    status: {
      type: String,
      default: "in progress",
    },
    UserID: { type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("payments", PaymentSchema);
