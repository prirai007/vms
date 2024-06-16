const Vote = require('../models/Vote');

module.exports = {
  async castVote(req, res) {
    const { candidate, position, category } = req.body;
    const userId = req.user.id;

    const existingVotes = await Vote.getVotesByUserId(userId);
    if (existingVotes.length > 0) {
      return res.status(400).json({ message: 'Vote already casted' });
    }

    const vote = await Vote.castVote(userId, candidate, position, category);
    res.json(vote);
  },
  async confirmVote(req, res) {
    const { voteId } = req.body;
    const vote = await Vote.confirmVote(voteId);
    res.json(vote);
  },
  async getAllVotes(req, res) {
    const votes = await Vote.getAllVotes();
    res.json(votes);
  }
};
