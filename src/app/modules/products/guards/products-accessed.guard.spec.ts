import { TestBed } from '@angular/core/testing';

import { ProductsAccessedGuard } from './products-accessed.guard';

describe('ProductsAccessedGuard', () => {
  let guard: ProductsAccessedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ProductsAccessedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
