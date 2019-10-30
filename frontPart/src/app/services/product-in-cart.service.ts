import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ProductInCartService {

  productIds: object = {};

  constructor() { }

  addProductInCart(orderId: number): void {
    if (!this.productIds[ orderId ]) {
      this.productIds[ orderId ] = 1; // where 1 is quantity
    }
  }

  getProductInCart(): object {
    return this.productIds;
  }

  deleteProductFromCart(productId: number): void {
    delete this.productIds[ productId ];
  }

  clearCart(): void {
    this.productIds = [];
  }

}
