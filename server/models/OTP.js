const mongoose = require("mongoose");


const OTPSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp : {
        type: String,
        required: true,
    },
})






module.exports = mongoose.model("OTP", OTPSchema);