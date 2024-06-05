// sendVerificationEmail.js
import Config from "../Server/config"; // Import the config file

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "lisa.wanjiku@aiesec.net",
    pass: "urqk jlyl urdr ajfy",
  },
});




const sendVerificationEmail = (email, token) => {
  const verificationUrl = `${Config.API_URL}/verify-email?token=${token}`;

  const mailOptions = {
    from: "lisa.wanjiku@aiesec.net",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email: ${verificationUrl}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};

module.exports = sendVerificationEmail;
