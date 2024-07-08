const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Configure Multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
}).single('profileImage');

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update user profile
exports.updateUserProfile = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: 'Error uploading file' });
    }

    const { username, email, phoneNumber, dob, gender, about, address } = req.body;

    const updatedFields = {
      username,
      email,
      phoneNumber,
      dob,
      gender,
      about,
      address: JSON.parse(address),
    };

    if (req.file) {
      updatedFields.profileImage = req.file.filename;
    }

    try {
      const user = await User.findByIdAndUpdate(
        req.user.id,
        { $set: updatedFields },
        { new: true }
      );

      res.json(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  });
};
