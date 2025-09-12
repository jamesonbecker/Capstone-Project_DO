import { TestBed } from '@angular/core/testing';

import { BillOfMaterialDetailService } from './bill-of-material-detail.service';

describe('BillOfMaterialDetailService', () => {
  let service: BillOfMaterialDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillOfMaterialDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
