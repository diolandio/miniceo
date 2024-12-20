/*
  # Fix products table schema

  1. Changes
    - Remove `isNew` column from products table
    - Add `is_new` column (following SQL naming conventions)
    
  2. Data Migration
    - Set default value for new column
*/

-- Remove old column and add new one with correct naming
ALTER TABLE products 
  DROP COLUMN IF EXISTS "isNew",
  ADD COLUMN IF NOT EXISTS is_new boolean DEFAULT true;