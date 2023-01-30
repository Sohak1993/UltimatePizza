import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, merge, Observable, of, skip, switchMap } from 'rxjs';
import { Pizza } from '../../models';
import { PizzasService, ToppingsService } from '../../services';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductItemComponent {

  public pizza$: Observable<Pizza>;
  public editedPizza$ = new BehaviorSubject<Pizza | null>(null);
  public currentPizzaState$: Observable<Pizza | null>;
  public toppings$: Observable<string[]>;

  constructor(
    private _toppingsService : ToppingsService,
    private _pizzasServcice : PizzasService,
    private _activeRoute : ActivatedRoute,
    private _router : Router
  ){
      this.toppings$ = _toppingsService.getToppings();

      this.pizza$ = this._activeRoute.params.pipe(switchMap((params) => {
        if(params['id'] == 'new')
          return of()
        else
          return _pizzasServcice.getPizzasById(params['id'])
      }))

      this.currentPizzaState$ = merge(
        this.pizza$,
        this.editedPizza$.pipe(skip(1))
      );     
  }

  public onEdit(event: Pizza) {
    this.editedPizza$.next({
      ...event
    })
  }

  public onCreate(event: Pizza) {
    this._pizzasServcice.createPizza(event).subscribe()
    this._router.navigate(['/products'])
  }

  public onUpdate(event: Pizza) {
    this._pizzasServcice.updatePizza(event).subscribe()
    this._router.navigate(['/products'])
  }

  public onRemove(event: Pizza) {
    this._pizzasServcice.removePizza(event).subscribe()
    this._router.navigate(['/products'])
  }
}
