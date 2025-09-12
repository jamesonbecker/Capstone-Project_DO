import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillOfMaterialDenyComponent } from './bill-of-material-deny.component';

describe('BillOfMaterialDenyComponent', () => {
  let component: BillOfMaterialDenyComponent;
  let fixture: ComponentFixture<BillOfMaterialDenyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillOfMaterialDenyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillOfMaterialDenyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
