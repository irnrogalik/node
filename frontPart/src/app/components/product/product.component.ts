import { ProductsForCart } from './../../interfaces/Cart';
import { ResponseServer } from './../../interfaces/ResponseServer';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/Product';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: [ './product.component.css' ]
})

export class ProductComponent implements OnInit {

  products: Product[];
  productsInCartIds: ProductsForCart[];
  response: ResponseServer;

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.getProducts();
    this.productsInCartIds = this.cartService.getProductInCart();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  addProductInCart(productId: number): void {
    this.cartService.addProductInCart(productId);
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe((response: ResponseServer) => {
      this.response = response;
      if (response.status === 200) {
        this.products = this.products.filter((oneProduct: Product) => oneProduct !== product);
      }
    }
    );
  }

  checkProduct(productId: number): boolean {
    return this.productsInCartIds.some(product => product.id === productId);
  }

}
