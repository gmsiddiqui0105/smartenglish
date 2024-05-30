const User = require("../models/User");
const express = require("express");
const mongoose = require("mongoose");
const argon2 = require("argon2");
const OTP = require('@multiotp/genotp');
const randomstring = require('randomstring')
const Otps = require('../models/OTP');
const sendEmail = require("../utils/sendEmail");




function generateOTP() {
    return randomstring.generate({
        length: 6,
        charset: "numeric"
    });
}




exports.register = async (req, res) => {

    try {

        const { name, email, password, confirmPassword, otp } = req.body;

        if (!name || !email || !password || !confirmPassword || !otp) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        if (password !== confirmPassword) {
            return res.status(401).json({
                success: false,
                message: "Passwords do not match"
            })
        }

        const existinguser = await User.findOne({ email });


        if (existinguser) {
            return res.status(404).json({
                success: "false",
                message: "User already exists, Please Sign in"
            })
        }

        const existingOTP = await Otps.findOneAndDelete({ email, otp });

        if (existingOTP) {
            // OTP is valid
            res.status(200).json({ success: true, message: 'OTP verification successful' });
        } else {
            // OTP is invalid
            res.status(400).json({ success: false, error: 'Invalid OTP' });
        
        }

        const hashedPassword = await argon2.hash(password);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        })

        res.status(200).json({
            success: "true",
            message: "User registered successfully",
            user,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message

        })
    }
}

exports.login = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.sendStatus(401).json({
                success: false,
                message: "All fields are required"
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User does not exist, Please register"
            })
        }

        if (await argon2.verify(user.password, password)) {
            return res.json({
                success: true,
                message: "User logged in successfully"
            })
        } else {
            return res.json({
                success: false,
                message: "Incorrect password"
            })
        }


    } catch (error) {
        console.log(error);
        res.sendStatus(500).json({
            success: true,
            message: error.message
        })
    }
}


//https://dev.to/manthanank/building-an-otp-verification-system-with-nodejs-and-mongodb-2p0o

exports.sendotp = async (req, res) => {

    try {

        const { email } = req.body;
        const otp = generateOTP();
        const newOTP = new Otps({ email, otp });
        await newOTP.save();


        await sendEmail({
            to: email,
            subject: "OTP Verification",
            message: `<p>Your OTP is: <strong>${otp}</strong></p>`,
        })

        res.json({
            success: true,
            message: "OTP sent successfully",
            otp
        });

    } catch (error) {
        console.error('Error sending OTP: ', error);
        res.json({ success: false, error: "Internal server error" })
    }

}

exports.verifyOTP = async (req, res, next) => {
    try {
        const { email, otp } = req.body;
        const existingOTP = await Otps.findOneAndDelete({ email, otp });

        if (existingOTP) {
            // OTP is valid
            res.status(200).json({ success: true, message: 'OTP verification successful' });
        } else {
            // OTP is invalid
            res.status(400).json({ success: false, error: 'Invalid OTP' });
        }
    } catch (error) {
        console.error('Error verifying OTP:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};


//https://medium.com/@zubitex40/creating-an-email-otp-send-verification-using-node-js-express-nodemailer-and-firebase-65dca59e8149