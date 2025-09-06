const express = require('express');
const { userAuth } = require('../middleware/auth');
const ConnectionRequest = require('../models/connectionRequest');
const User = require('../models/user');
const requireRouter = express.Router();

requireRouter.post(
  '/request/sent/:status/:toUserId',
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const allowedStatus = ['ignored', 'interested'];
      if (!allowedStatus.includes(status)) {
        throw new Error('Invalid Status type..' + status);
      }
      const toUser = await User.findById(toUserId);
      if (!toUser) {
        return res.status(404).json({ message: 'User not found!' });
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });
      if (existingConnectionRequest) {
        return res
          .status(400)
          .send({ message: 'Connection Request Already Exist!' });
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });
      const data = await connectionRequest.save();
      res.json({
        message:
          req.user.firstName + ' is ' + status + ' in ' + toUser.firstName,
        data,
      });
    } catch (err) {
      res.status(400).send('ERROR : ' + err.message);
    }
  }
);

requireRouter.post(
  '/request/review/:status/:requestedId',
  userAuth,
  async (req, res) => {
    try {
      const loggedInUser = req.user;
      const { status, requestedId } = req.params;
      const allowedStatus = ['accepted', 'rejected'];
      if (!allowedStatus.includes(status)) {
        return res.status(400).json({ message: 'Status not allowed!' });
      }
      const connectionRequest = await ConnectionRequest.findOne({
        _id: requestedId,
        status: 'interested',
        $or: [{ toUserId: loggedInUser._id }, { fromUserId: loggedInUser._id }],
      });

      if (!connectionRequest) {
        return res
          .status(404)
          .json({ message: 'Connection request not found!' });
      }
      connectionRequest.status = status;
      const data = await connectionRequest.save();
      res.json({ message: 'Connection request :' + status, data });
    } catch (err) {
      res.status(400).send('ERROR : ' + err.message);
    }
  }
);

module.exports = requireRouter;
