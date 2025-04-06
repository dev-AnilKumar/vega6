const userModel = require("../models/userModel");
const fs = require("fs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
    const file = req.files.profileImage;
    req.body.email = req.body.email.toLowerCase();
    const { email } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) throw new Error("User Already Exists");
        const imageBuffer = fs.readFileSync(file.tempFilePath);
        const imageBase64 = imageBuffer.toString('base64');

        await userModel.create({ ...req.body, profileImage: imageBase64 });
        res.status(201).json({ msg: "User Registered Successfully", success: true });
    } catch (error) {
        console.log("Register User Error");
        console.log(error)
        res.json({ err: error.message, success: false })
    } finally {
        fs.unlink((file.tempFilePath), function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("deleted file")
            }
        });
    }
}

const loginUser = async (req, res) => {
    req.body.email = req.body.email.toLowerCase();
    const { email, password } = req.body;
    try {

        let user = await userModel.findOne({ email });
        if (!user) throw new Error("Invalid Credentials");

        if (user && await user.isPasswordMatch(password)) {
            res.status(200).json({
                token: jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "15m" }),
                profileImage: user?.profileImage,
                success: true
            })
        } else {
            throw new Error("Invalid Credentials");
        }

    } catch (error) {
        console.log("Login User Error");
        console.log(error)
        res.json({ err: error.message, success: false })
    }
}


module.exports = { registerUser, loginUser }