const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role:{
    type:Number,
    default:0
  },
  cart: {
        type: Array,
        default: []
    }
},
{
    timestamps:true
}
);

module.exports = mongoose.model("users", UserSchema);
