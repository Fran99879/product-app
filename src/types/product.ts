import type { Brand } from "../features/products/constants/brands";

export interface Product {
  id: string;
  name: string;
  brand: Brand;
  description: string;
  image: string;
  price: number;
  quantity: number;
}