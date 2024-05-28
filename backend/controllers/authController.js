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
  console.log("Received registration data:", req.body);
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

    res.status(201).json({ message: 'User registered. Please check your email to verify your account.' });
  } catch (error) {
    console.error("Error during registration:", error);
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already registered' });
    } else if (error.message.includes('Missing credentials for "PLAIN"')) {
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

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Signed in successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error signing in' });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.query;
  try {
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ error: 'Invalid token' });
    }

    user.verified = true;
    await user.save();

    res.redirect('/email-verified');
  } catch (error) {
    console.error('Error verifying email:', error);
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

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error resetting password' });
  }
};

exports.twoFactorAuth = async (req, res) => {
  const { email, code } = req.body;
  try {
    const user = await User.findOne({ email, twoFactorCode: code });
    if (!user) {
      return res.status(400).json({ error: 'Invalid 2FA code' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, message: 'Signed in successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error during 2FA' });
  }
};
