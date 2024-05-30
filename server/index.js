const express = require('express');
const app = express();
const database = require("./config/database");
const auth = require("./controllers/Auth");
const cors = require('cors');


require('dotenv').config();
const PORT = process.env.PORT

database.connectDB();

app.use(express.json());
app.use(cors());
 


app.get('/', (req, res) => {
    res.send("Backend is Connected Successfully")
})

app.post("/register", auth.register);

app.post("/login", auth.login);

app.get('/sendOTP', auth.sendotp);
app.get('/verifyOTP', auth.verifyOTP);

app.listen(PORT, () => {
    console.log(`App is listening at ${PORT}`);
})