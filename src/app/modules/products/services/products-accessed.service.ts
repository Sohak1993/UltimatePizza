import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsAccessedService {

  public productAccessed = false;
  
  setProductAccessedTrue() : void {  
    this.productAccessed = true
  }
}
