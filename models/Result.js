const pool = require('../config/db');

const createResultTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS results (
      id SERIAL PRIMARY KEY,
      position VARCHAR(50),
      category VARCHAR(50),
      winner VARCHAR(100),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(query);
};

createResultTable();

module.exports = {
  async publishResult(position, category, winner) {
    const query = `INSERT INTO results (position, category, winner) VALUES ($1, $2, $3) RETURNING *`;
    const values = [position, category, winner];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
  async getResultByPositionAndCategory(position, category) {
    const query = `SELECT * FROM results WHERE position = $1 AND category = $2`;
    const result = await pool.query(query, [position, category]);
    return result.rows[0];
  },
  async getAllResults() {
    const query = `SELECT * FROM results`;
    const result = await pool.query(query);
    return result.rows;
  }
};
