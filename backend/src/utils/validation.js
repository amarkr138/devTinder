const validator = require('validator');
const validationSignUp = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error('Enter the valid  name');
  } else if (!validator.isEmail(emailId)) {
    throw new Error('Invalid email address..');
  } else if (!validator.isStrongPassword(password)) {
    throw new Error('enter the valid password');
  }
};
const validateEditProfileData = (req) => {
  const isEditFields = [
    'firstName',
    'lastName',
    'emailId',
    'age',
    'gender',
    'skills',
    'about',
    'photoUrl',
  ];

  const isEditAllowed = Object.keys(req.body).every((field) =>
    isEditFields.includes(field)
  );
  return isEditAllowed;
};

module.exports = { validationSignUp, validateEditProfileData };
