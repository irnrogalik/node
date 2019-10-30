import { Component, OnInit } from '@angular/core';
import { OrderAmount, Cart, OrderResult } from 'src/app/interfaces/Cart';
import { Product } from 'src/app/interfaces/Product';
import { ProductInCartService } from 'src/app/services/product-in-cart.service';
import { CartService } from './../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: [ './cart.component.css' ],
})

export class CartComponent implements OnInit {

  cart: Cart;
  thankMessage: string;

  constructor(private cartService: CartService, private productInCartService: ProductInCartService) { }

  ngOnInit() {
    const productsIds = this.productInCartService.getProductInCart();
    console.log(productsIds);
    if (productsIds) {
      this.getProductsInCart(productsIds);
    }
  }

  getProductsInCart(productsIds: object): void {
    this.cartService.getProductsInCart(productsIds).subscribe((cart: Cart) => this.cart = cart);
  }

  createOrder() {
    this.cartService.createOrder(this.productInCartService.getProductInCart()).subscribe(
      (result: OrderResult) => {
        if (result.status && result.status === 200) {
          this.productInCartService.clearCart();
        }
        if (result.orderList) {
          this.cart = result.orderList;
        }
        this.thankMessage = result.message;
      },
    );
  }

  deleteProductFromCart(product: Product) {
    this.productInCartService.deleteProductFromCart(product.id);
    this.getProductsInCart(this.productInCartService.getProductInCart());
  }

}
