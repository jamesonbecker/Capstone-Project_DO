import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderCreateDialogComponent } from './purchase-order-create-dialog.component';

describe('PurchaseOrderCreateDialogComponent', () => {
  let component: PurchaseOrderCreateDialogComponent;
  let fixture: ComponentFixture<PurchaseOrderCreateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderCreateDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseOrderCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
