export type Business = {
  id: string;
  user_id: string;
  name: string;
  type: 'toys' | 'food';
  theme: string;
  created_at: string;
};

export type Product = {
  id: string;
  business_id: string;
  name: string;
  price: number;
  image_url: string;
  image_path?: string;
  image_name?: string;
  featured: boolean;
  popular: boolean;
  is_new: boolean;
  stock_quantity: number;
  stock_alert_threshold: number;
  created_at: string;
};

export type Transaction = {
  id: string;
  business_id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  created_at: string;
};

export type BusinessHours = {
  id: string;
  business_id: string;
  day_of_week: number;
  open_time: string;
  close_time: string;
  created_at: string;
};

export type BusinessStatus = {
  id: string;
  business_id: string;
  is_inaugurated: boolean;
  inauguration_date: string | null;
  is_open: boolean;
  created_at: string;
};