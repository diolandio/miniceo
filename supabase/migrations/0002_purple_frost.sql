/*
  # Criar tabela de produtos e políticas de segurança

  1. Nova Tabela
    - `products`
      - `id` (uuid, chave primária)
      - `business_id` (uuid, referência à tabela businesses)
      - `name` (text, nome do produto)
      - `price` (numeric, preço do produto)
      - `image_url` (text, URL da imagem)
      - `featured` (boolean, produto em destaque)
      - `popular` (boolean, produto popular)
      - `isNew` (boolean, produto novo)
      - `created_at` (timestamptz, data de criação)

  2. Segurança
    - Habilitar RLS na tabela products
    - Adicionar política para usuários autenticados gerenciarem produtos de seus negócios
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id uuid REFERENCES businesses NOT NULL,
  name text NOT NULL,
  price numeric NOT NULL,
  image_url text NOT NULL,
  featured boolean DEFAULT false,
  popular boolean DEFAULT false,
  isNew boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage products for their businesses"
  ON products
  FOR ALL
  TO authenticated
  USING (
    business_id IN (
      SELECT id FROM businesses 
      WHERE user_id = auth.uid()
    )
  );