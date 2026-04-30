import { Product } from "./product";

export interface OrderItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  status: string;
  total: number;
}