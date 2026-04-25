import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

// Load env vars
dotenv.config({ path: '.env' });

async function init() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
  });

  try {
    const dbName = process.env.DB_NAME || 'room_rent_db';
    
    console.log(`Creating database ${dbName} if not exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    
    console.log(`Using database ${dbName}...`);
    await connection.query(`USE \`${dbName}\`;`);

    console.log('Creating rooms table if not exists...');
    await connection.query(`
      CREATE TABLE IF NOT EXISTS rooms (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        price INT NOT NULL,
        location VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        description TEXT,
        contact VARCHAR(100)
      );
    `);

    console.log('Database initialization complete!');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await connection.end();
  }
}

init();
