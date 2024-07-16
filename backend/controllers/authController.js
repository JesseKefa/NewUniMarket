const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const User = require('../models/User');

// Register User
exports.register = async (req, res) => {
  const { email, password, phoneNumber, username, dob } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      email,
      password,
      phoneNumber,
      username,
      dob,
      verified: false,
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const token = crypto.randomBytes(32).toString('hex');
    user.verificationToken = token;

    await user.save();

    const verificationUrl = `http://localhost:3000/verify-email/${token}`;

    await sendEmail({
      to: user.email,
      subject: 'Verify your email',
      text: `Click the following link to verify your email: ${verificationUrl}`,
    });

    res.status(201).json({ msg: 'User registered. Check your email for verification link' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Verify Email
exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid token' });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.status(200).json({ msg: 'Email verified successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Login User
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (!user.verified) {
      return res.status(400).json({ msg: 'Please verify your email first' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: 'Reset your password',
      text: `Please reset your password by clicking the link: ${resetLink}`,
    });

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    res.status(200).json({ message: 'Password reset successfully. You can now log in with your new password.' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
