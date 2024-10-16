import pkg from 'validator';
const { isStrongPassword } = pkg;

export const passwordValidator = (req) => {
    const { password } = req.body;
    if (!isStrongPassword(password)) {
        throw new Error('Enter a strong password !');
    }
}
