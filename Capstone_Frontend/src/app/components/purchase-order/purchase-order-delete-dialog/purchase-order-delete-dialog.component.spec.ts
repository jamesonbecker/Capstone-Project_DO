import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderDeleteDialogComponent } from './purchase-order-delete-dialog.component';

describe('PurchaseOrderDeleteDialogComponent', () => {
  let component: PurchaseOrderDeleteDialogComponent;
  let fixture: ComponentFixture<PurchaseOrderDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseOrderDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
