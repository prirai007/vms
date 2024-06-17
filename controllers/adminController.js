const pool = require('../config/db');

exports.getAllVotes = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM votes');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getVoteCount = async (req, res) => {
    try {
        const result = await pool.query('SELECT position, category, candidate, COUNT(*) as vote_count FROM votes GROUP BY position, category, candidate');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.publishResults = async (req, res) => {
    try {
        //publish result
        res.json({ message: 'Results published successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getResults = async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM results');
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
