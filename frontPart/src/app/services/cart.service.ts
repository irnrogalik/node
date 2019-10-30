import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Cart, OrderAmount, OrderResult } from '../interfaces/Cart';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  httpOptions: object = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getProductsInCart(productIds: object): Observable<Cart> {
    return this.http.post<Cart>(`${ environment.appUrl }/${ environment.cartUrl }`, productIds, this.httpOptions);
  }

  createOrder(productIds: object): Observable<OrderResult> {
    return this.http.post<OrderResult>(`${ environment.appUrl }/${ environment.cartUrl }/order`, productIds, this.httpOptions);
  }

}
