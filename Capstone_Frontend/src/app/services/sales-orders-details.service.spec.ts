import { TestBed } from '@angular/core/testing';

import { SalesOrdersDetailsService } from './sales-orders-details.service';

describe('SalesOrdersDetailsService', () => {
  let service: SalesOrdersDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SalesOrdersDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
