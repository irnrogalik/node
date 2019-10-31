import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/interfaces/Cart';
import { ResponseServer } from './../../interfaces/ResponseServer';
import { OrderListService } from './../../services/order-list.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: [ './order-list.component.css' ]
})

export class OrderListComponent implements OnInit {

  orders: Order[];
  response: ResponseServer;

  constructor(private orderListService: OrderListService) { }

  ngOnInit() {
    this.getOrders();
  }

  getOrders(): void {
    this.orderListService.getOrders().subscribe(orders => this.orders = orders);
  }

  deleteOrder(order: Order): void {
    this.orderListService.deleteOrder(order.id).subscribe(
      (response: ResponseServer) => {
        this.response = response;
        if (response.status === 200) {
          this.orders = this.orders.filter((oneOrder: Order) => oneOrder !== order);
        }
      }
    );
  }

}
