-- GuntFlix Schema for Supabase/PostgreSQL
-- Run this in Supabase SQL Editor (Database → SQL Editor)

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
    actors TEXT[],
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
