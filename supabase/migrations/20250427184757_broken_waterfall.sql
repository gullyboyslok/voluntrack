/*
  # Create users table with authentication and profile management

  1. New Tables
    - `users`
      - Basic Information:
        - `id` (uuid, primary key)
        - `email` (text, unique, not null)
        - `first_name` (text)
        - `last_name` (text)
        - `age` (integer)
        - `city` (text)
        - `interests` (text[])
        - `discovered_through` (text)
        - `created_at` (timestamptz, default: now())

  2. Security
    - Enable RLS on users table
    - Add policies for:
      - Users can read their own data
      - Users can update their own data
      - Public can check email existence
      - Anyone can insert (sign up)
*/

-- Create users table
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  first_name text,
  last_name text,
  age integer,
  city text,
  interests text[],
  discovered_through text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own data"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Public can check email existence"
  ON users
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Enable sign up"
  ON users
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Create index for performance
CREATE INDEX users_email_idx ON users (email);