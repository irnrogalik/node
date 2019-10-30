import { TestBed } from '@angular/core/testing';

import { ProductInCartService } from './product-in-cart.service';

describe('ProductInCartService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProductInCartService = TestBed.get(ProductInCartService);
    expect(service).toBeTruthy();
  });
});
