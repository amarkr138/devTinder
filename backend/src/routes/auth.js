const express = require('express');
const validator = require('validator');
const { validationSignUp } = require('../utils/validation');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const authRouter = express.Router();

authRouter.post('/signup', async (req, res) => {
  try {
    validationSignUp(req);
    const { firstName, lastName, emailId, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    const SaveUser = await user.save();
    const token = await SaveUser.getJWT();
    res.cookie('token', token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });
    res.json({ message: 'User  added successfully..', data: SaveUser });
  } catch (err) {
    res.status(400).send('ERROR : ' + err.message);
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie('token', token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send(user);
    } else {
      throw new Error('Invalid credentials');
    }
  } catch (err) {
    res.status(400).send('ERROR : ' + err.message);
  }
});

authRouter.post('/logout', async (req, res) => {
  res.cookie('token', null, {
    expires: new Date(Date.now()),
  });
  res.send('Logout Successfull!');
});

module.exports = authRouter;
