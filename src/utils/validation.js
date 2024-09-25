const validator = require('validator');

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error('Firstname or Lastname missing !');
    }
    if (!validator.isEmail(emailId)) {
        throw new Error('Invalid Email id !');
    }
    if (!validator.isStrongPassword(password)) {
        throw new Error('Enter a strong password !');
    }
}


module.exports = { validateSignUpData };