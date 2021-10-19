import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart, ProductsForCart, OrderResult } from '../interfaces/Cart';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  httpOptions: object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  productIds: ProductsForCart[] = [];

  addProductInCart(productId: number): void {
    if (!this.productIds.some(product => product.id === productId)) {
      this.productIds.push({ id: productId, quantity: 1 });
    }
  }

  getProductInCart(): ProductsForCart[] {
    return this.productIds;
  }

  deleteProductFromCart(productId: number): void {
    this.productIds = this.productIds.filter(product => product.id !== productId);
  }

  clearCart(): void {
    this.productIds = [];
  }

  getProductsInCart(productIds: object): Observable<Cart> {
    return this.http.post<Cart>(`${ environment.appUrl }/${ environment.orderUrl }/cart`, productIds, this.httpOptions);
  }

  createOrder(productIds: object): Observable<OrderResult> {
    return this.http.post<OrderResult>(`${ environment.appUrl }/${ environment.orderUrl }/add`, productIds, this.httpOptions);
  }

}
