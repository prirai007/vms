const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/votes', authMiddleware.verifyAdmin, adminController.getAllVotes);
router.get('/vote-count', authMiddleware.verifyAdmin, adminController.getVoteCount);
router.post('/publish', authMiddleware.verifyAdmin, adminController.publishResults);
router.get('/results', authMiddleware.verifyAdmin, adminController.getResults);

module.exports = router;
