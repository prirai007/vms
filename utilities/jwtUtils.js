const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure environment variables are loaded

const generateToken = (user) => {
    // Payload can contain more information
    // const payload = { id: user.id, email: user.email };
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role,
    };

    // Generate a token
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
    });
};

const verifyToken = (token) => {
    try {
        // Verify the token
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid token');
    }
};

module.exports = {
    generateToken,
    verifyToken,
};
