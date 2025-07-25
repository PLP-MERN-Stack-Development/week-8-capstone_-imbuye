// backend/sendTestEmail.js
require('dotenv').config(); // Loads environment variables
const nodemailer = require('nodemailer');

const sendTestEmail = async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: process.env.EMAIL_USERNAME,
      subject: '🔥 Test Email from Backend',
      text: 'This is a test email sent directly from backend without using the frontend.',
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Test email sent:', info.response);
  } catch (error) {
    console.error('❌ Error sending test email:', error);
  }
};

sendTestEmail();
