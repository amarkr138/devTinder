const socket = require('socket.io');
const crypto = require('crypto');
const { Chat } = require('../models/chat');

const getSecureRoomId = (userId, targetUserId) => {
  return crypto
    .createHash('sha256')
    .update([userId, targetUserId].sort().join('-'))
    .digest('hex');
};

const initialiseSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });
  io.on('connection', (socket) => {
    socket.on('joinChat', ({ firstName, userId, targetUserId }) => {
      const roomId = getSecureRoomId(userId, targetUserId);
      console.log(firstName + 'joining room:' + roomId);
      socket.join(roomId);
    });

    socket.on(
      'sendMessages',
      async ({ firstName, userId, targetUserId, text }) => {
        try {
          const roomId = getSecureRoomId(userId, targetUserId);
          console.log(firstName + ' :' + text);

          let chat = await Chat.findOne({
            participants: { $all: [userId, targetUserId] },
          });
          if (!chat) {
            chat = new Chat({
              participants: [userId, targetUserId],
              messages: [],
            });
          }
          chat.messages.push({
            senderId: userId,
            text,
          });
          await chat.save();

          io.to(roomId).emit('messageReceived', { firstName, text });
        } catch (err) {
          console.error(err.message);
        }
      }
    );
    socket.on('disconnect', () => {});
  });
};
module.exports = initialiseSocket;
