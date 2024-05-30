const mongoose = require("mongoose");
require("dotenv").config();


const URL = process.env.MONGODB_URL;

exports.connectDB = async () => {

    await mongoose.connect(URL).
        then(() => console.log("MongoDB is connected Successfully"))
        .catch((err) => console.log(err));

}