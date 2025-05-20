/*
  # Create messages table and enhance users table

  1. New Tables
    - `messages`
      - `id` (uuid, primary key)
      - `sender_id` (integer, references users.id)
      - `recipient_id` (integer, references users.id)
      - `subject` (text, not null)
      - `content` (text, not null)
      - `created_at` (timestamptz, default: now())
      - `read` (boolean, default: false)
      - `deleted` (boolean, default: false)
      - `bookmarked` (boolean, default: false)

  2. Security
    - Enable RLS on messages table
    - Add policies for:
      - Users can read messages they sent or received
      - Users can update (mark as read/deleted/bookmarked) their own messages
      - Users can insert new messages

  3. Changes to users table
    - Add email verification fields
    - Add rate limiting fields
    - Add 2FA fields
*/

-- Create messages table
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sender_id INTEGER REFERENCES users(id) NOT NULL,
  recipient_id INTEGER REFERENCES users(id) NOT NULL,
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  read BOOLEAN DEFAULT false,
  deleted BOOLEAN DEFAULT false,
  bookmarked BOOLEAN DEFAULT false
);

-- Enable RLS on messages
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create policies for messages
CREATE POLICY "Users can read their own messages"
  ON messages
  FOR SELECT
  USING (auth.uid()::text = sender_id::text OR auth.uid()::text = recipient_id::text);

CREATE POLICY "Users can send messages"
  ON messages
  FOR INSERT
  WITH CHECK (auth.uid()::text = sender_id::text);

CREATE POLICY "Users can update their own messages"
  ON messages
  FOR UPDATE
  USING (auth.uid()::text = sender_id::text OR auth.uid()::text = recipient_id::text);

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS messages_sender_id_idx ON messages (sender_id);
CREATE INDEX IF NOT EXISTS messages_recipient_id_idx ON messages (recipient_id);
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages (created_at DESC);

-- Enhance users table
ALTER TABLE users 
  ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS verification_token TEXT,
  ADD COLUMN IF NOT EXISTS verification_token_expires_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS login_attempts INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS locked_until TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS two_factor_secret TEXT;

-- Add function to reset login attempts
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