import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillOfMaterialConfirmComponent } from './bill-of-material-confirm.component';

describe('BillOfMaterialConfirmComponent', () => {
  let component: BillOfMaterialConfirmComponent;
  let fixture: ComponentFixture<BillOfMaterialConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillOfMaterialConfirmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillOfMaterialConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
