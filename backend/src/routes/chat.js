const express = require('express');
const { userAuth } = require('../middleware/auth');
const { Chat } = require('../models/chat');
const chatRouter = express.Router();

chatRouter.get('/chat/:targetUserId', userAuth, async (req, res) => {
  const userId = req.user._id;
  const { targetUserId } = req.params;
  try {
    let chat = await Chat.findOne({
      participants: { $all: [userId, targetUserId] },
    }).populate({
      path: 'messages.senderId',
      select: 'firstName',
    });
    if (!chat) {
      chat = new Chat({
        participants: [userId, targetUserId],
        messages: [],
      });
      await chat.save();
    }
    res.status(200).json(chat);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = chatRouter;