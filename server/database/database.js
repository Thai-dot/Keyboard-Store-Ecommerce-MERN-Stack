const mongo = require("mongoose");

const connectDB = async () => {
  try {
    await mongo.connect(
      process.env.MONGO_URL
    );
    console.log("Mongodb connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB; 