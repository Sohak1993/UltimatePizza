import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductsAccessedService } from '../services/products-accessed.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsAccessedGuard implements CanActivate {

  constructor(
    private _productAccessedService : ProductsAccessedService,
    private _router : Router
    ){}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    return this._productAccessedService.productAccessed 
      ? this._productAccessedService.productAccessed 
      : this._router.parseUrl('/products')
  }
}
