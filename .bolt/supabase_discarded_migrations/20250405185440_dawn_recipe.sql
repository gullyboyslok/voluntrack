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
    total_hours INT DEFAULT 0,
    email_verified BOOLEAN DEFAULT false,
    verification_token TEXT,
    verification_token_expires_at TIMESTAMPTZ,
    last_login TIMESTAMPTZ,
    login_attempts INTEGER DEFAULT 0,
    locked_until TIMESTAMPTZ,
    two_factor_enabled BOOLEAN DEFAULT false,
    two_factor_secret TEXT
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view own data" ON users;
DROP POLICY IF EXISTS "Users can update own data" ON users;
DROP POLICY IF EXISTS "Enable sign up" ON users;
DROP POLICY IF EXISTS "Public can check email existence" ON users;

-- Create updated policies
CREATE POLICY "Users can view own data"
    ON users
    FOR SELECT
    USING (auth.uid()::text = id::text);

CREATE POLICY "Users can update own data"
    ON users
    FOR UPDATE
    USING (auth.uid()::text = id::text);

-- Allow public email existence check and signup
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

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS users_email_idx ON users (email);