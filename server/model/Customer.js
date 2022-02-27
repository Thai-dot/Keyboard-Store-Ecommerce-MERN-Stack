const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CusSchema = new Schema(
  {
    CusName: {
      type: String,
      required: true,
    },
    CusGender: {
      type: String,
      required: true,
      enum:["Male","Female","Others"]
    },
    CusEmail: {
      type: String,
      required: true,
    },
    UserID:{ type: mongoose.SchemaTypes.ObjectId, ref: "users" },
  }
);

module.exports = mongoose.model("customers", CusSchema);
