const express = require('express');
const router = express.Router();
const voteController = require('../controllers/voteController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/', authMiddleware.verifyAdmin, voteController.castVote);

module.exports = router;
