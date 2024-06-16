const pool = require('../config/db');

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100),
      roll_number VARCHAR(50) UNIQUE,
      email VARCHAR(100) UNIQUE,
      role VARCHAR(50),
      department VARCHAR(100)
    )
  `;
  await pool.query(query);
};

createUserTable();

module.exports = {
  async createUser(name, rollNumber, email, role, department) {
    const query = `INSERT INTO users (name, roll_number, email, role, department) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
    const values = [name, rollNumber, email, role, department];
    const result = await pool.query(query, values);
    return result.rows[0];
  },
  async findUserByEmail(email) {
    const query = `SELECT * FROM users WHERE email = $1`;
    const result = await pool.query(query, [email]);
    return result.rows[0];
  }
};
