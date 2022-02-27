const express = require("express");
const router = express.Router();

const Payment = require("../model/Payment");
const User = require("../model/User");
const Keyboard = require("../model/Keyboard");

const authAdmin = require("../middleware/authAdmin");

// @route GET api/payment
// @desc Get all payment
// @access Admin only
router.get("/",authAdmin, async (req, res) => {
    try {
        const payments = await Payment.find();

        res.status(200).json({ success: true, payments });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @route Post api/payment
// @desc Add payment    
// @access Customer only
router.post("/", async (req, res) => {
 try {
    const user = await User.findById(req.userId)
    if (!user) return res.status(400).json({ msg: "User does not exist." }); 

    const newPayment = new Payment({    
        nameOrder: req.body.nameOrder,
        address: req.body.address,
        cart: user.cart,
        status: req.body.status,
        UserID: req.userId,
    });

    await newPayment.save();

    cart.forEach( async(item) =>{
        if (item)
        await Keyboard.findByIdAndUpdate(item.keyboardId, { $inc: { keyboardQuantity: -1,keyboardSold: 1 } });

    })

    res.status(200).json({ success: true,message:"New payment added", payment: newPayment });
    
 } catch (error) {
     console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
 }
}
);


//Export router
module.exports = router;
