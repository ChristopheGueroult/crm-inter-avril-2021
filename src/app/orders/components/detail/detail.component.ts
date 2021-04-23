import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public item$!: Subject<Order | null>;
  constructor(private ordersService: OrdersService) {
    this.item$ = this.ordersService.itemSelected$;
  }

  ngOnInit(): void {}
}
