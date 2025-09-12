import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderProductComponent } from './purchase-order-product.component';

describe('PurchaseOrderCreateComponent', () => {
  let component: PurchaseOrderProductComponent;
  let fixture: ComponentFixture<PurchaseOrderProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseOrderProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
