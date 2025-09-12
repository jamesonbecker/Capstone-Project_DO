import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderPartComponent } from './purchase-order-part.component';

describe('PurchaseOrderPartComponent', () => {
  let component: PurchaseOrderPartComponent;
  let fixture: ComponentFixture<PurchaseOrderPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseOrderPartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseOrderPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
