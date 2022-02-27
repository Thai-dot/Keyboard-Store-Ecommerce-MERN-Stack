const User = require("../model/User");

const authAdmin = async (req, res, next) => {
  try {
    // Get user information by id
    const user = await User.findOne({
      _id: req.userId,
    });
    if (user.role === 0)
      return res.status(400).json({ msg: "You are not admin" });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authAdmin;
