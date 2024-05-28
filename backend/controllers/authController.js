const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Setup email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.register = async (req, res) => {
  const { email, password, name, phone, dateOfBirth } = req.body;
  console.log("Received registration data:", req.body);  // Log received data
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name, phone, dateOfBirth, verified: false });
    await user.save();

    // Send verification email
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const url = `http://localhost:3000/verify-email?token=${token}`;
    await transporter.sendMail({
      to: email,
      subject: 'Verify your email',
      html: `<a href="${url}">Click here to verify your email</a>`,
    });

    res.status(201).json({ message: 'User registered. Please check your email for verification.' });
  } catch (error) {
    console.error("Error during registration:", error);  // Log the error
    if (error.code === 11000) {
      // Duplicate key error
      res.status(400).json({ error: 'Email already registered' });
    } else if (error.message.includes('Missing credentials for "PLAIN"')) {
      // Email credential error
      res.status(500).json({ error: 'Email service credentials are incorrect' });
    } else {
      res.status(500).json({ error: 'Error registering user' });
    }
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    if (!user.verified) {
      return res.status(400).json({ error: 'Please verify your email before signing in' });
    }

    // Generate 2FA code and send it
    const twoFactorCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.twoFactorCode = twoFactorCode;
    await user.save();

    await transporter.sendMail({
      to: email,
      subject: 'Your 2FA code',
      text: `Your 2FA code is ${twoFactorCode}`,
    });

    res.json({ message: '2FA code sent to your email' });
  } catch (error) {
    res.status(500).json({ error: 'Error signing in' });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query; // Get the token from URL query params
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    user.verified = true;
    await user.save();

    res.redirect('/email-verified'); // Redirect to a frontend page after successful verification
  } catch (error) {
    console.error('Error verifying email:', error); // Log the error
    res.status(500).json({ error: 'Error verifying email' });
  }
};

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Email not found' });
    }

    // Generate reset token and send email
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const url = `http://localhost:3000/reset-password?token=${token}`;
    await transporter.sendMail({
      to: email,
      subject: 'Reset your password',
      html: `<a href="${url}">Click here to reset your password</a>`,
    });

    res.json({ message: 'Password reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ error: 'Error sending password reset link' });
  }
};

exports.resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ error: 'Error resetting password' });
  }
};
