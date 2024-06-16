const User = require('../models/User');

module.exports = {
  async getUserProfile(req, res) {
    const user = await User.findUserByEmail(req.user.email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  }
};
