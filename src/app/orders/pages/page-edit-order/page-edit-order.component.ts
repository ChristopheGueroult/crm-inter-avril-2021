import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/core/models/order';
import { OrdersService } from '../../services/orders.service';

@Component({
  selector: 'app-page-edit-order',
  templateUrl: './page-edit-order.component.html',
  styleUrls: ['./page-edit-order.component.scss'],
})
export class PageEditOrderComponent implements OnInit {
  public item!: Order;
  constructor(
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((data) => {
      const id = Number(data.get('id'));
      // appeler la fn ordersService.getItemById(id)
      this.ordersService.getItemById(id).subscribe((res) => {
        // console.log(res);
        this.item = res;
      });
    });
  }

  ngOnInit(): void {}
  public action(item: Order): void {
    this.ordersService.update(item).subscribe((res) => {
      // console.log(res);
      // si aucun code error
      this.router.navigate(['orders']);
    });
  }
}
