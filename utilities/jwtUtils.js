const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        throw new Error('Invalid Token');
    }
};

module.exports = {
    generateToken,
    verifyToken,
};
