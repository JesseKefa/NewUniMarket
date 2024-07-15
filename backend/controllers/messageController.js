const Message = require('../models/Message');

exports.sendMessage = async (req, res) => {
  try {
    const { receiver, content } = req.body;
    const newMessage = new Message({
      sender: req.user.id,
      receiver,
      content,
    });
    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ message: 'Error sending message' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [{ sender: req.user.id }, { receiver: req.user.id }],
    }).populate('sender', 'username').populate('receiver', 'username');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
};
