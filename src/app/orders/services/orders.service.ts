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
  public itemSelected$: BehaviorSubject<Order | null> = new BehaviorSubject<Order | null>(
    new Order()
  );
  constructor(private http: HttpClient) {
    this.refreshCollection();
  }

  public refreshCollection(id?: number): void {
    this.http.get<Order[]>(`${this.urlApi}/orders`).subscribe((data) => {
      if (!id) {
        this.itemSelected$.next(data[0]);
      }
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
      tap((obj) => {
        // attention aux retour error de l'api
        this.refreshCollection(item.id);
        this.itemSelected$.next(obj);
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
        // id de celui qui doit etre supprim??
        // si l'id de celui qu'on veut delete = id de itemSelected$, on vide itemSelected$
        if (this.itemSelected$.value && id === this.itemSelected$.value.id) {
          this.itemSelected$.next(null);
        }
        // sinon on laisse tel quel itemSelected$
        this.refreshCollection(id);
      })
    );
  }

  // get item by id in collection
  public getItemById(id: number): Observable<Order> {
    return this.http.get<Order>(`${this.urlApi}/orders/${id}`).pipe(
      tap((obj) => {
        // attention aux retour error de l'api
        this.refreshCollection(id);
        this.itemSelected$.next(obj);
      })
    );
  }
}
