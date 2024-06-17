const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const seedDatabase = async () => {
    try {
        // Connecting to database
        await pool.connect();
        await pool.query(`
            INSERT INTO users (email, password, role)
            VALUES 
                ('admin@example.com', 'adminpassword', 'admin'),
                ('voter1@example.com', 'voterpassword', 'voter')
            ON CONFLICT (email) DO NOTHING;
        `);

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
        await pool.end();
    }
};

seedDatabase();
