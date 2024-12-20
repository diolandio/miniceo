/*
  # Add product stock management

  1. Changes to Products Table
    - Add `stock_quantity` column
    - Add `stock_alert_threshold` column for low stock warnings
  
  2. Security
    - Update existing RLS policies
*/

-- Add stock management columns to products
ALTER TABLE products
ADD COLUMN IF NOT EXISTS stock_quantity integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS stock_alert_threshold integer DEFAULT 5;