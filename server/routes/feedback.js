const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.get('/test', (req, res) => {
  console.log('🎯 Dummy /api/feedback/test hit!');
  res.json({ message: 'Feedback test route works!' });
});

router.post('/', async (req, res) => {
  console.log('🎯 /api/feedback hit with body:', req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    console.log('❌ Missing fields');
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const mailOptions = {
      from: email,
      to: process.env.EMAIL_USERNAME,
      subject: `Feedback from ${name}`,
      text: message
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('📨 Feedback email sent!', info);
    res.status(200).json({ message: 'Feedback sent successfully' });
  } catch (err) {
    console.error('❌ Failed to send feedback:', err);
    res.status(500).json({ error: 'Failed to send feedback' });
  }
});

module.exports = router;
