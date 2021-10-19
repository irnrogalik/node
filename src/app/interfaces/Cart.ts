import { Product } from './Product';

export interface Cart {
  products: Product[];
  order: OrderAmount;
}

export interface Order {
  id: number;
  date: Date;
  displayDate?: string;
  salesTaxes: number;
  total: number;
}

export interface OrderAmount {
  total: number;
  totalTax: number;
}

export interface OrderResult {
  status: number;
  message: string;
  // orderList: Cart;
  products: Product[];
  order: OrderAmount;
}

export interface ProductsForCart {
  id: number;
  quantity: number;
}
