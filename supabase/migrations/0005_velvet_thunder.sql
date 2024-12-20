/*
  # Add business hours and inauguration features

  1. New Tables
    - `business_hours`
      - `id` (uuid, primary key)
      - `business_id` (uuid, references businesses)
      - `day_of_week` (integer, 0-6)
      - `open_time` (time)
      - `close_time` (time)
    
    - `business_status`
      - `id` (uuid, primary key)
      - `business_id` (uuid, references businesses)
      - `is_inaugurated` (boolean)
      - `inauguration_date` (timestamptz)
      - `is_open` (boolean)

  2. Security
    - Enable RLS on both tables
    - Add policies for business owners
*/

-- Create business_hours table
CREATE TABLE IF NOT EXISTS business_hours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses NOT NULL,
  day_of_week integer NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  open_time time NOT NULL,
  close_time time NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(business_id, day_of_week)
);

-- Create business_status table
CREATE TABLE IF NOT EXISTS business_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses NOT NULL UNIQUE,
  is_inaugurated boolean DEFAULT false,
  inauguration_date timestamptz,
  is_open boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE business_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_status ENABLE ROW LEVEL SECURITY;

-- Policies for business_hours
CREATE POLICY "Users can manage their business hours"
  ON business_hours
  FOR ALL
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses 
      WHERE user_id = auth.uid()
    )
  );

-- Policies for business_status
CREATE POLICY "Users can manage their business status"
  ON business_status
  FOR ALL
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses 
      WHERE user_id = auth.uid()
    )
  );