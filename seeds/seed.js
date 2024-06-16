const { Pool } = require('pg');
require('dotenv').config();

// Create a new pool instance
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const seedDatabase = async () => {
    try {
        // Connect to the database
        await pool.connect();

        // Insert initial users
        await pool.query(`
            INSERT INTO users (email, password, role)
            VALUES 
                ('admin@example.com', 'adminpassword', 'admin'),
                ('voter1@example.com', 'voterpassword', 'voter')
            ON CONFLICT (email) DO NOTHING;
        `);

        // Insert initial candidates
        await pool.query(`
            INSERT INTO candidates (name, party)
            VALUES 
                ('John Doe', 'Party A'),
                ('Jane Smith', 'Party B')
            ON CONFLICT (name) DO NOTHING;
        `);

        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        // End the pool connection
        await pool.end();
    }
};

seedDatabase();
