const express = require('express');
const bcrypt = require('bcrypt');
const validator = require('validator');

const profileRouter = express.Router();
const { userAuth } = require('../middleware/auth');
const { validateEditProfileData } = require('../utils/validation');

profileRouter.get('/profile/view', userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send('ERROR : ' + err.message);
  }
});
profileRouter.patch('/profile/edit',userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error('Invalid Edit Request');
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile updated successfully`,
    });
  } catch (err) {
    res.status(400).send('ERROR : ' + err.message);
  }
  });


  profileRouter.patch('/profile/update-password', userAuth, async (req, res) => {
  try {
    const {  newPassword } = req.body;

    if ( !newPassword) {
      throw new Error('Invalid password');
    }

    if (!validator.isStrongPassword(newPassword)) {
      throw new Error('New password is too weak');
    }

    req.user.password = await bcrypt.hash(newPassword, 10);
    await req.user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(400).send('ERROR : ' + err.message);
  }
});

module.exports = profileRouter;
