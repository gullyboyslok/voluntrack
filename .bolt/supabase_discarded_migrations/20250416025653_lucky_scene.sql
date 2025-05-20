/*
  # Create users table with authentication and profile management

  1. New Tables
    - `users`
      - Basic Information:
        - `id` (uuid, primary key)
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
      
      - Security & Authentication:
        - `email_verified` (boolean, default: false)
        - `verification_token` (text, nullable)
        - `verification_token_expires_at` (timestamptz, nullable)
        - `last_login` (timestamptz, nullable)
        - `login_attempts` (integer, default: 0)
        - `locked_until` (timestamptz, nullable)
        - `two_factor_enabled` (boolean, default: false)
        - `two_factor_secret` (text, nullable)

  2. Security
    - Enable RLS on users table
    - Add policies for:
      - Users can read their own data
      - Users can update their own data
      - Public can check email existence
      - Anyone can insert (sign up)

  3. Indexes
    - Email index for faster lookups
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name varchar(50),
    last_name varchar(50),
    email varchar(100) UNIQUE NOT NULL,
    password_hash text NOT NULL,
    age integer,
    city varchar(100),
    interests text[],
    status varchar(20),
    discovered_through text,
    total_hours integer DEFAULT 0,
    email_verified boolean DEFAULT false,
    verification_token text,
    verification_token_expires_at timestamptz,
    last_login timestamptz,
    login_attempts integer DEFAULT 0,
    locked_until timestamptz,
    two_factor_enabled boolean DEFAULT false,
    two_factor_secret text,
    created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Public can check email existence" ON users;
DROP POLICY IF EXISTS "Enable sign up" ON users;

-- Create policies
CREATE POLICY "Users can view own data"
    ON users
    FOR SELECT
    USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data"
    ON users
    FOR UPDATE
    USING (auth.uid()::text = id::text);

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

-- Drop existing index if it exists
DROP INDEX IF EXISTS users_email_idx;

-- Create indexes for performance
CREATE INDEX users_email_idx ON users (email);

-- Drop existing function and trigger if they exist
DROP TRIGGER IF EXISTS reset_login_attempts_trigger ON users;
DROP FUNCTION IF EXISTS reset_login_attempts();

-- Create function to reset login attempts on successful login
CREATE OR REPLACE FUNCTION reset_login_attempts()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.last_login IS NOT NULL AND NEW.last_login != OLD.last_login THEN
        NEW.login_attempts := 0;
        NEW.locked_until := NULL;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to reset login attempts on successful login
CREATE TRIGGER reset_login_attempts_trigger
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION reset_login_attempts();