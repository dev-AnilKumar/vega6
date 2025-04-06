const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')

const authmiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    try {
        if (!token) {
            return res.status(401).json({ error: 'Authorization token missing' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
            const user = await userModel.findById(decoded.id);
            req.user = user;
            next();
        } else {
            throw new Error("Not Logged In. Please login again");
        }
    } catch (error) {
        console.log(error);
        res.json({ msg: error.message, success: false })
    }
}


module.exports = authmiddleware