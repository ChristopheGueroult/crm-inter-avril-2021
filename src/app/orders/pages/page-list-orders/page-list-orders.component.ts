import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
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
  public title!: string;
  // public collection!: Order[];
  public collection$: Subject<Order[]>;
  public headers: string[];
  constructor(
    private ordersService: OrdersService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.data.subscribe((data) => {
      this.title = data.title;
    });
    this.collection$ = this.ordersService.collection;
    // this.ordersService.collection.subscribe((data) => {
    //   this.collection = data;
    // });
    this.headers = [
      'Actions',
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

  public goToEdit(id: number) {
    this.router.navigate(['orders', 'edit', id]);
  }
  public deleteItem(id: number) {
    this.ordersService.deleteItem(id).subscribe((data) => {
      // gère les cas d'erreur de l'api
      // on va devoir maj collection$
    });
  }

  public getInfoItem(id: number): void {
    this.ordersService.getItemById(id).subscribe();
  }
}
