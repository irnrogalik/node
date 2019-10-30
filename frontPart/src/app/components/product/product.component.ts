import { ResponseServer } from './../../interfaces/ResponseServer';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../interfaces/Product';
import { ProductInCartService } from 'src/app/services/product-in-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: [ './product.component.css' ]
})

export class ProductComponent implements OnInit {

  products: Product[];
  productsInCartIds: {};
  response: ResponseServer;

  constructor(private productService: ProductService, private productInCartService: ProductInCartService) { }

  ngOnInit() {
    this.getProducts();
    this.productsInCartIds = this.productInCartService.getProductInCart();
  }

  getProducts(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  addProductInCart(productId: number): void {
    this.productInCartService.addProductInCart(productId);
  }

  deleteProduct(product: Product): void {
    this.productService.deleteProduct(product.id).subscribe((response: ResponseServer) => {
      this.response = response;
      if (response.status === 200) {
        this.getProducts();
      }
    }
    );
  }

}
