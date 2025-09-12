import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillOfMaterialDetailComponent } from './bill-of-material-detail.component';

describe('BillOfMaterialDetailComponent', () => {
  let component: BillOfMaterialDetailComponent;
  let fixture: ComponentFixture<BillOfMaterialDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillOfMaterialDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillOfMaterialDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
