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
const validateEditProfileData = (req) => {
    const changesAllowed = ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"];
    const user = req.body;
    const isAllowedChanges = Object.keys(user).every((field) => changesAllowed.includes(field));

    return isAllowedChanges;

}


module.exports = { validateSignUpData, validateEditProfileData };