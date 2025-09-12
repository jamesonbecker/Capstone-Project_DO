import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBillDetailsComponent } from './product-bill-details.component';

describe('ProductBillDetailsComponent', () => {
  let component: ProductBillDetailsComponent;
  let fixture: ComponentFixture<ProductBillDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBillDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductBillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
