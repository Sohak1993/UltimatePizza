import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services';
import { ProductsAccessedService } from '../../services/products-accessed.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsComponent {

    public pizzas$: Observable<Pizza[]>;

    constructor(
        private pizzasService: PizzasService, 
        private productAccessedService: ProductsAccessedService
    ){              
        this.pizzas$ = this.pizzasService.getPizzas();
        this.productAccessedService.setProductAccessedTrue()
    }
}
