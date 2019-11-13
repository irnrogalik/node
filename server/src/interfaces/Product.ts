export interface Product {
  id?: number;
  name: string;
  price: number;
  taxValue?: string;
  priceTax?: number[];
  countValue?: number;
  categoryName?: string;
  category?: string;
  categories?: Array<number>;
}
