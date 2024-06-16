const pool = require('../config/db');

const createVoteTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS votes (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      candidate VARCHAR(100),
      position VARCHAR(50),
      category VARCHAR(50),
      confirmed BOOLEAN,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(query);
};

createVoteTable();

module.exports = {
  async castVote(userId, candidate, position, category) {
    const query = `INSERT INTO votes (user_id, candidate, position, category, confirmed) VALUES ($1, $2, $3, $4, false) RETURNING *`;
    const values = [userId, candidate, position, category];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
  async confirmVote(voteId) {
    const query = `UPDATE votes SET confirmed = true WHERE id = $1 RETURNING *`;
    const result = await pool.query(query, [voteId]);
    return result.rows[0];
  },
  async getVotesByUserId(userId) {
    const query = `SELECT * FROM votes WHERE user_id = $1`;
    const result = await pool.query(query, [userId]);
    return result.rows;
  },
  async getAllVotes() {
    const query = `SELECT * FROM votes`;
    const result = await pool.query(query);
    return result.rows;
  }
};
