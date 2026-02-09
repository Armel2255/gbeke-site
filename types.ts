
export type Section = 'accueil' | 'matin' | 'midi' | 'soir';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  desc: string;
  isAvailable?: boolean;
}

export interface ConfigOption {
  label: string;
  value: number;
}

export interface Order {
  id: string;
  items: string;
  total: number;
  timestamp: number;
  type: 'matin' | 'midi' | 'soir';
}
