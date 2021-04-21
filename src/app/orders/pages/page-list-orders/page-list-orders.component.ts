import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StateOrder } from 'src/app/core/enums/state-order.enum';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-list-orders',
  templateUrl: './page-list-orders.component.html',
  styleUrls: ['./page-list-orders.component.scss'],
})
export class PageListOrdersComponent implements OnInit {
  public states = Object.values(StateOrder);
  public title = 'List Orders';
  // public collection!: Order[];
  public collection$: Observable<Order[]>;
  public headers: string[];
  constructor(private ordersService: OrdersService) {
    this.collection$ = this.ordersService.collection;
    // this.ordersService.collection.subscribe((data) => {
    //   this.collection = data;
    // });
    this.headers = [
      'Type',
      'Client',
      'NbJours',
      'TjmHT',
      'TotalHT',
      'TotalTTC',
      'State',
    ];
  }

  ngOnInit(): void {}
  public changeTitle(): void {
    this.title = 'Ma liste de commandes';
  }
  public changeState(item: Order, event: any): void {
    const state = event.target.value;
    this.ordersService.changeState(item, state).subscribe((data) => {
      // gère les cas d'erreur de l'api
      item.state = data.state;
    });
  }
}
