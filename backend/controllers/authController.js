const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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

exports.verifyEmail = async (req, res) => {
  try {
    const user = await User.findOne({ verificationToken: req.params.token });

    if (!user) {
      return res.status(400).json({ msg: 'Invalid token' });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({ msg: 'Email verified successfully. You can now log in.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

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
      res.json({ token, username: user.username });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateProfile = async (req, res) => {
  const { username, phoneNumber, dob } = req.body;

  try {
    const updatedFields = { username, phoneNumber, dob };

    const user = await User.findByIdAndUpdate(req.user.id, { $set: updatedFields }, { new: true });
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};
