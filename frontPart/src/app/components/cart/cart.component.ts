import { Component, OnInit } from '@angular/core';
import { Cart, OrderResult, ProductsForCart } from 'src/app/interfaces/Cart';
import { Product } from 'src/app/interfaces/Product';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [ './cart.component.css' ],
})

export class CartComponent implements OnInit {

  cart: Cart;
  thankMessage: string;
  productIdsInCart: ProductsForCart[];

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.productIdsInCart = this.cartService.getProductInCart();
    if (this.productIdsInCart) {
      this.getProductsInCart(this.productIdsInCart);
    }
  }

  getProductsInCart(productIds: object): void {
    this.cartService.getProductsInCart(productIds).subscribe((cart: Cart) => this.cart = cart);
  }

  createOrder(): void {
    this.cartService.createOrder(this.productIdsInCart).subscribe(
      (result: OrderResult) => {
        if (result.status && result.status === 200) {
          this.cartService.clearCart();
        }
        if (result.orderList) {
          this.cart = result.orderList;
        }
        this.thankMessage = result.message;
      },
    );
  }

  deleteProductFromCart(product: Product): void {
    this.cartService.deleteProductFromCart(product.id);
    this.productIdsInCart = this.productIdsInCart.filter(oneProduct => oneProduct.id !== product.id);
    this.getProductsInCart(this.productIdsInCart);
  }

}
