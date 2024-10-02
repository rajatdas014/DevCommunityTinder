import pkg from 'validator';
const { isEmail, isStrongPassword } = pkg;

export const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error('Firstname or Lastname missing !');
    }
    if (!isEmail(emailId)) {
        throw new Error('Invalid Email id !');
    }
    if (!isStrongPassword(password)) {
        throw new Error('Enter a strong password !');
    }
}
export const validateEditProfileData = (req) => {
    const changesAllowed = ["firstName", "lastName", "age", "gender", "photoUrl", "about", "skills"];
    const user = req.body;
    const isAllowedChanges = Object.keys(user).every((field) => changesAllowed.includes(field));

    return isAllowedChanges;

}
