// Handling middleware
const adminAuth = (req, res, next) => {
    console.log('authencating');
    const token = 'abc';
    const checkAdmin = token === 'abc';
    if (!checkAdmin) {
        res.status(401).send('unauthorised access');
    }
    else {
        next();
    }
}

module.exports = { adminAuth };

