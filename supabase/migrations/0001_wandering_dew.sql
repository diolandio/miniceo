/*
  # Initial schema for Kids Business App

  1. New Tables
    - `businesses`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `type` (text)
      - `theme` (text)
      - `created_at` (timestamp)
    
    - `transactions`
      - `id` (uuid, primary key)
      - `business_id` (uuid, references businesses)
      - `type` (text)
      - `amount` (numeric)
      - `description` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create businesses table
CREATE TABLE businesses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  theme text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create transactions table
CREATE TABLE transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses NOT NULL,
  type text NOT NULL,
  amount numeric NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Policies for businesses
CREATE POLICY "Users can manage their own businesses"
  ON businesses
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Policies for transactions
CREATE POLICY "Users can manage transactions for their businesses"
  ON transactions
  FOR ALL
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses 
      WHERE user_id = auth.uid()
    )
  );