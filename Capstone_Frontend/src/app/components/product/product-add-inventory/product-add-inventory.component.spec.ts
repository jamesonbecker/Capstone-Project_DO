import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAddInventoryComponent } from './product-add-inventory.component';

describe('ProductBomDialogComponent', () => {
  let component: ProductAddInventoryComponent;
  let fixture: ComponentFixture<ProductAddInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductAddInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAddInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
