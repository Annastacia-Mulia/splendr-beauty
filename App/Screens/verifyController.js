const User = require('../models/User');

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;

  try {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    // Send a success message along with the response
    res.status(200).json({ message: 'Email verified successfully you can now login' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying email', error });
  }
};
