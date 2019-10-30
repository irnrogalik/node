export interface Product {
  id?: number;
  name: string;
  price: number;
  productTax?: number;
  categoryName?: string;
  category?: string;
  categories?: Array<number>;
}
