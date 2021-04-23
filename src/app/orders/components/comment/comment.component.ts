import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  public item$!: Subject<Order | null>;
  constructor(private ordersService: OrdersService) {
    this.item$ = this.ordersService.itemSelected$;
  }

  ngOnInit(): void {}
}
