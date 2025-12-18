import { Pool } from '@neondatabase/serverless';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function initDB() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  });

  try {
    console.log('Initializing database...');

    // Drop existing tables if they exist (for fresh start)
    await pool.query('DROP TABLE IF EXISTS videos CASCADE');
    await pool.query('DROP TABLE IF EXISTS profiles CASCADE');

    // Create profiles table
    await pool.query(`
      CREATE TABLE profiles (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        full_name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(20) NOT NULL,
        interest VARCHAR(50) NOT NULL,
        college_name VARCHAR(255) NOT NULL,
        grad_year INTEGER NOT NULL,
        role VARCHAR(50) DEFAULT 'student',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // Create videos table
    await pool.query(`
      CREATE TABLE videos (
        id SERIAL PRIMARY KEY,
        youtube_id VARCHAR(50) NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        category VARCHAR(50) NOT NULL,
        mentor_name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
    `);

    // Create indexes for better performance
    await pool.query('CREATE INDEX ON profiles (email)');
    await pool.query('CREATE INDEX ON videos (category)');
    await pool.query('CREATE INDEX ON videos (mentor_name)');

    // Insert sample admin user
    await pool.query(`
      INSERT INTO profiles (email, password, full_name, phone_number, interest, college_name, grad_year, role)
      VALUES ('admin@connecttomentor.com', 'admin123', 'Admin User', '0000000000', 'development', 'Demo College', 4, 'admin')
      ON CONFLICT (email) DO NOTHING;
    `);

    // Insert sample videos
    await pool.query(`
      INSERT INTO videos (youtube_id, title, description, category, mentor_name) VALUES
      ('dQw4w9WgXcQ', 'Introduction to Web Development', 'Learn the basics of HTML, CSS, and JavaScript', 'DEVELOPMENT', 'John Smith'),
      ('jNQXAC9IVRw', 'Getting Started with React', 'Build modern web applications with React', 'DEVELOPMENT', 'Sarah Johnson'),
      ('9bZkp7q19f0', 'Data Structures 101', 'Understanding arrays, linked lists, and trees', 'DSA', 'Dr. Michael Chen'),
      ('kJQP7kiw5Fk', 'Algorithm Design Patterns', 'Common patterns for solving coding problems', 'DSA', 'Prof. Emily Davis')
      ON CONFLICT DO NOTHING;
    `);

    console.log('Database initialized successfully!');
    console.log('Sample admin user: admin@connecttomentor.com / admin123');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    await pool.end();
  }
}

initDB();
