const express = require("express");
const router = express.Router();

const Keyboard = require("../model/Keyboard");

const verifyToken = require("../middleware/verifyToken");
const authAdmin = require("../middleware/authAdmin");

// @route GET api/keyboard
// @desc Get all keyboards
// @access public
router.get("/", async (req, res) => {
    try {
        const keyboards = await Keyboard.find();
        res.json(keyboards);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});




// @route GET api/keyboard/:id
// @desc Get keyboard by id
// @access public
router.get("/:id", async (req, res) => {
    try {
        const keyboard = await Keyboard.findById(req.params.id);
        res.json(keyboard);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
});


// @route post api/keyboard
// @desc create new keyboard
// @access AdminOnly
router.post("/",verifyToken,authAdmin, async (req, res) => {
    const {
      keyboardName,
      keyboardType,
      keyboardBrand,
      keyboardCountry,
      keyboardPrice,
      keyboardColor,
      keyboardImage,
      keyboardInsuranceMonth,
      keyboardQuantity,
      keyboardDescription,
    } = req.body;

    //Check if all fields are filled
    if (!keyboardName || !keyboardType || !keyboardBrand || !keyboardCountry || !keyboardPrice || !keyboardColor || !keyboardImage || !keyboardInsuranceMonth || !keyboardQuantity || !keyboardDescription) {
        return res.status(400).json({
            success: false,
            message: "Missing some data input"
        });
    }

    try {

        const keyboard = Keyboard.findOne({keyboardName});

        if (!keyboard) {
            return res.status(400).json({
                success: false,
                message: "Keyboard name already exists"
            });
        }

        const newKeyboard = new Keyboard({
            keyboardName,
            keyboardType,
            keyboardBrand,
            keyboardCountry,
            keyboardPrice,
            keyboardColor,
            keyboardDescription,
            keyboardImage,
            keyboardInsuranceMonth,
            keyboardQuantity});
    
        await newKeyboard.save();

        res.status(200).json({
            success: true,
            message: "Keyboard added successfully"
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});


// @route PUT api/keyboard/:id
// @desc Update keyboard by id
// @access AdminOnly
router.put("/:id",verifyToken,authAdmin, async (req, res) => {
    const {
      keyboardName,
      keyboardType,
      keyboardBrand,
      keyboardCountry,
      keyboardPrice,
      keyboardColor,
      keyboardImage,
      keyboardInsuranceMonth,
      keyboardQuantity,
      keyboardDescription,
    } = req.body;

    //Check if all fields are filled
    if (!keyboardName || !keyboardType || !keyboardBrand || !keyboardCountry || !keyboardPrice || !keyboardColor || !keyboardImage || !keyboardInsuranceMonth || !keyboardQuantity || !keyboardDescription) {
        return res.status(400).json({
            success: false,
            message: "Missing some data input"
        });
    }

    try {
        const keyboard = await Keyboard.findById(req.params.id);

        if (!keyboard) {
            return res.status(400).json({
                success: false,
                message: "Keyboard not found"
            });
        }

        keyboard.keyboardName = keyboardName;
        keyboard.keyboardType = keyboardType;
        keyboard.keyboardBrand = keyboardBrand;
        keyboard.keyboardCountry = keyboardCountry;
        keyboard.keyboardPrice = keyboardPrice;
        keyboard.keyboardColor = keyboardColor;
        keyboard.keyboardDescription = keyboardDescription;
        keyboard.keyboardImage = keyboardImage;
        keyboard.keyboardInsuranceMonth = keyboardInsuranceMonth;
        keyboard.keyboardQuantity = keyboardQuantity;

        await keyboard.save();

        res.status(200).json({
            success: true,
            message: "Keyboard updated successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const keyboard = await Keyboard.findById(req.params.id);

        if (!keyboard) {
            return res.status(400).json({
                success: false,
                message: "Keyboard not found"
            });

        }

        await keyboard.remove();

        res.status(200).json({
            success: true,
            message: "Keyboard deleted successfully"
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});



//Export router
module.exports = router;