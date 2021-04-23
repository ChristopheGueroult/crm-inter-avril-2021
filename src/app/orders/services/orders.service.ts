import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { StateOrder } from 'src/app/core/enums/state-order.enum';
import { Order } from 'src/app/core/models/order';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  // private collection
  private collection$: BehaviorSubject<Order[]> = new BehaviorSubject<Order[]>(
    []
  );
  private urlApi = environment.urlApi;
  constructor(private http: HttpClient) {
    this.refreshCollection();
  }

  public refreshCollection(): void {
    this.http.get<Order[]>(`${this.urlApi}/orders`).subscribe((data) => {
      this.collection$.next(data);
    });
  }

  // get collection
  public get collection(): BehaviorSubject<Order[]> {
    return this.collection$;
  }

  // set collection
  public set collection(col: BehaviorSubject<Order[]>) {
    this.collection$ = col;
  }

  // change state item
  public changeState(item: Order, state: StateOrder): Observable<Order> {
    const obj = { ...item };
    obj.state = state;
    return this.update(obj);
  }

  // update item in collection
  public update(item: Order): Observable<Order> {
    return this.http.put<Order>(`${this.urlApi}/orders/${item.id}`, item).pipe(
      tap(() => {
        this.refreshCollection();
      })
    );
  }

  // add item in collection
  public add(item: Order): Observable<Order> {
    return this.http.post<Order>(`${this.urlApi}/orders`, item).pipe(
      tap(() => {
        this.refreshCollection();
      })
    );
  }

  // delete item in collection
  public deleteItem(id: number): Observable<Order> {
    return this.http.delete<Order>(`${this.urlApi}/orders/${id}`).pipe(
      tap(() => {
        this.refreshCollection();
      })
    );
  }

  // get item by id in collection
  public getItemById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.urlApi}/orders/${id}`);
  }
}
