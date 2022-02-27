const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KeyboardSchema = new Schema(
  {
    keyboardName: {
      type: String,
      required: true,
      unique: true,
    },
    keyboardType: {
      type: String,
      required: true,
    },
    keyboardBrand: {
      type: String,
      required: true,
      default: "No brand",
    },
    keyboardCountry: {
      type: String,
      required: true,
      default: "Unknonw",
    },
    keyboardPrice: {
      type: Number,
      min: 0,
      required: true,
    },
    keyboardColor: {
      type: Array,
      required: true,
      default: "black",
    },
    keyboardDescription: {
      type: String,
      required: true,
      default: "No description",
    },
    keyboardImage: {
      type: String,
      required: true,
      default:
        "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png",
    },
    keyboardInsuranceMonth: {
      type: Number,
      required: true,
      default: 6,
    },
    keyboardQuantity: {
      type: Number,
      required: true,
      default: 0,
    },
    keyboardSold: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("keyboards", KeyboardSchema);
