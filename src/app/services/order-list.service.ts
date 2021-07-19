import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../interfaces/Cart';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrderListService {

  constructor(private http: HttpClient) { }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(`${ environment.appUrl }/${ environment.orderUrl }`);
  }

  deleteOrder(orderId: number): Observable<object> {
    return this.http.post<Order[]>(`${ environment.appUrl }/${ environment.orderUrl }/remove/${ orderId }`, { orderId });
  }

}
