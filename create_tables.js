const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:juTzo6-jegjet-togsuq@db.jknpkcxirqikdujhgcdl.supabase.co:5432/postgres',
  ssl: { rejectUnauthorized: false } // Supabase requires SSL
});

const createSchema = `
-- GuntFlix Schema for Supabase/PostgreSQL

CREATE TABLE IF NOT EXISTS movies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    genre_name TEXT,
    genre_description TEXT,
    director_name TEXT,
    director_bio TEXT,
    director_birth INTEGER,
    director_death INTEGER,
    actors TEXT[] DEFAULT '{}',
    image_path TEXT,
    featured BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    birthday DATE,
    favorite_movies UUID[] DEFAULT '{}'
);

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_movies_title ON movies(title);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
`;

(async () => {
  try {
    console.log('Connecting to Supabase PostgreSQL...');
    const client = await pool.connect();
    
    // Check if tables already exist
    const { rows: existingTables } = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
    `);
    
    console.log('Existing tables:', existingTables.map(t => t.table_name));

    // Create tables
    await client.query(createSchema);
    console.log('✓ Tables created successfully!');
    
    // Verify tables exist now
    const { rows: newTables } = await client.query(`
      SELECT table_name FROM information_schema.tables 
      WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
    `);
    console.log('\nAll tables:', newTables.map(t => t.table_name));

    // Create sample movie if movies is empty
    const { rows: count } = await client.query('SELECT COUNT(*) FROM movies');
    console.log(`\nMovies in database: ${count[0].count}`);
    
    if (parseInt(count[0].count) === 0) {
      const insertMovie = `INSERT INTO movies (title, description, genre_name, director_name, actors, image_path, featured) VALUES ($1, $2, $3, $4, $5, $6, $7)`;
      await client.query(insertMovie, [
        'The Matrix',
        'A computer hacker learns about the true nature of reality.',
        'Sci-Fi',
        'Wachowski Sisters',
        ['Keanu Reeves', 'Laurence Fishburne'],
        '/images/matrix.jpg',
        true
      ]);
      console.log('✓ Added sample movie: The Matrix');
    }

    client.release();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
})();
