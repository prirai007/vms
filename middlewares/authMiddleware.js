const jwt = require('jsonwebtoken');

exports.verifyAdmin = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ message: 'Access Denied' });
    }
    
    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        if (verified.role !== 'admin') {
            return res.status(403).json({ message: 'Access Forbidden' });
        }
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: 'Invalid Token' });
    }
};
