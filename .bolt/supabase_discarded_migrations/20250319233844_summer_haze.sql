/*
  # Create users table with authentication and profile management

  1. New Tables
    - `users`
      - `id` (serial, primary key)
      - `first_name` (varchar(50), nullable)
      - `last_name` (varchar(50), nullable)
      - `email` (varchar(100), unique, not null)
      - `password_hash` (text, not null)
      - `age` (integer, nullable)
      - `city` (varchar(100), nullable)
      - `interests` (text[], nullable)
      - `status` (varchar(20), nullable)
      - `discovered_through` (text, nullable)
      - `total_hours` (integer, default: 0)

  2. Security
    - Enable RLS on users table
    - Add policies for:
      - Users can read their own data
      - Users can update their own data
      - Anyone can insert (sign up)
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    age INT,
    city VARCHAR(100),
    interests TEXT[],
    status VARCHAR(20),
    discovered_through TEXT,
    total_hours INT DEFAULT 0
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data"
    ON users
    FOR SELECT
    USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data"
    ON users
    FOR UPDATE
    USING (auth.uid()::text = id::text);

CREATE POLICY "Enable sign up"
    ON users
    FOR INSERT
    WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS users_email_idx ON users (email);