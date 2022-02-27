const express = require("express");
const router = express.Router();

const Customer = require("../model/Customer");
const verifyToken = require("../middleware/verifyToken");

// @route GET api/customer
// @desc Get a informarttion of customer
// @access Public
router.get("/", verifyToken, async (req, res) => {
    try {
      
        const customer = await Customer.find({ UserID: req.userId });
        
        if (!customer)
        return res
            .status(400)
            .json({ success: false, message: "Customer not found" });


        res.json({ success: true,
        customer });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

// @route Put api/customer
// @desc Update infor customer
// @access Public

router.put("/", verifyToken, async (req, res) => {
    try {
        const {CusName,CusGender,CusEmail} = req.body
        const customer = await Customer.findOneAndUpdate({ UserID: req.userId }, {
            CusName,
            CusGender,
            CusEmail
        });
        if (!customer)
            return res
                .status(400)
                .json({ success: false, message: "Customer not found" });
        res.json({ success: true, message: "Update customer success" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


module.exports = router;