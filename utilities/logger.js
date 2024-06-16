const pool = require('../config/db');

module.exports = {
  async logEvent(event) {
    const query = `INSERT INTO logs (event) VALUES ($1)`;
    await pool.query(query, [event]);
  }
};
