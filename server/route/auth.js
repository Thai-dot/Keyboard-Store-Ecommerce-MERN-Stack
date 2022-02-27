const express = require("express");
const router = express.Router();
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const User = require("../model/User");
const Customer = require("../model/Customer");
const verifyToken = require("../middleware/verifyToken");

// @route GET api/auth
// @desc Check if user is logged in
// @access Public
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// @route POST api/auth/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  const { username, password, CusName, CusGender, CusEmail } = req.body;
  // Simple validation
  if (!username || !password)
    return res.status(400).json({
      success: false,
      message: "Missing username , password or other information ",
    });

  try {
    // Check for existing user
    const user = await User.findOne({ username });

    if (user)
      return res
        .status(400)
        .json({ success: false, message: "Username already taken" });

    // All good
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword });

    await newUser.save();

    const newCus = new Customer({
      CusName,
      CusGender,
      CusEmail,
      UserID: newUser._id,
    });
    await newCus.save();

    // Return token
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

	//refresh token
    const refreshtoken = jwt.sign(
      { userID: newUser._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/api/auth/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    return res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Simple validation
  if (!username || !password)
    return res
      .status(400)
      .json({ success: false, message: "Missing username and/or password" });

  try {
    // Check for existing user
    const user = await User.findOne({ username });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    // Username found
    const passwordValid = await argon2.verify(user.password, password);
    if (!passwordValid)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect username or password" });

    // All good
    // Return token
    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    //refresh token
    const refreshtoken = jwt.sign(
      { userID: user._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/api/auth/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7d
    });

    res.json({
      success: true,
      message: "User logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

//@Route Get api/auth/refreshToken
//@Desc Refresh token
//@Access Public
router.get("/refresh_token", async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token)
      return res.status(400).json({ msg: "Please Login or Register" });

    jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please Login or Register" });

      const accesstoken = jwt.sign({userId: user.userId}, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "11m",
      });

      res.json({ accesstoken });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

//@Route GET api/auth/logout
//@desc Logout user
//@access Public
router.get("/logout", (req, res) => {
	 try {
     res.clearCookie("refreshtoken", { path: "/api/auth/refresh_token" });
     return res.json({ msg: "Logged out" });
   } catch (err) {
     return res.status(500).json({ msg: err.message });
   }
});

//@Route PATCH api/auth/add_cart
//@desc Add to cart
//access user only
router.patch("/add_cart", verifyToken, async (req, res) => {
	  try {
		  const user = await User.findById(req.userId);
		  if (!user)

			  return res.status(400).json({ success: false, message: "User not found" });

		  await User.findOneAndUpdate({_id:req.userID},{
			    $push: { cart: req.body.cart } 
		  })

		  return res.json({ success: true, message: "added to cart successfully" });
		  
	  }catch(error) {
			console.log(error);
			res.status(500).json({ success: false, message: "Internal server error" });
		}
});

//@Route PATCH api/auth/remove_cart
//@desc Remove from cart
//access user only
router.patch("/remove_cart", verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user)
        return res.status(400).json({ success: false, message: "User not found" });
      
      await User.findOneAndUpdate({_id:req.userID},{
        $pull: { cart: req.body.cart }
      })

      return res.json({ success: true, message: "removed from cart successfully" });

    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });


//@Route PATCH api/auth/update_cart
//@desc Update cart
//access user only
router.patch("/update_cart", verifyToken, async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user)
        return res.status(400).json({ success: false, message: "User not found" });

      await User.findOneAndUpdate({_id:req.userID},{
        $set: { cart: req.body.cart }
      })

      return res.json({ success: true, message: "updated cart successfully" });

    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });


//@Route GET api/auth/get_cart
//@desc Get cart
//access user only
router.get("/get_cart", verifyToken, async (req, res) => {
    try { 
      const user = await User.findById(req.userId);
      if (!user)
        return res.status(400).json({ success: false, message: "User not found" });

      return res.json({ success: true, message: "cart fetched successfully", cart: user.cart });

    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  });

//@Route DELETE api/auth/delete_cart
//@desc Delete all cart items
//access user only
router.delete("/delete_cart", verifyToken, async (req, res) => {

    try {
      const user = await User.findById(req.userId);
      if (!user)
        return res.status(400).json({ success: false, message: "User not found" });

      await User.findOneAndUpdate({_id:req.userID},{
        $set: { cart: [] }
      })

      return res.json({ success: true, message: "cart deleted successfully" });

    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal server error" });
    }

  });



module.exports = router;
