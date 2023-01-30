import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as containers from './containers';
import { ProductsAccessedGuard } from './guards/products-accessed.guard';

const routes: Routes = [
    {
        path: '',
        component: containers.ProductsComponent,
    },
    {
        path: ':id',
        component: containers.ProductItemComponent, canActivate: [ProductsAccessedGuard]
    },
    {
        path: "**",
        component: containers.ProductsComponent,
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
