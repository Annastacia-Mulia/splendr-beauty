// signupController.js

const crypto = require('crypto');
const User = require('../models/User');
const sendVerificationEmail = require('../utils/sendVerificationEmail');

exports.signup = async (req, res) => {
  const { firstName, lastName, phone, gender, email, password } = req.body;
  const verificationToken = crypto.randomBytes(32).toString('hex');

  try {
    const user = new User({
      firstName,
      lastName,
      phone,
      gender,
      email,
      password,
      verificationToken,
    });
    await user.save();



    sendVerificationEmail(email, verificationToken);

    res.status(201).json({ message: 'User created successfully. Please check your email for verification link.' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
};
