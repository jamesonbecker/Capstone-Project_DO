import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillOfMaterialCreateComponent } from './bill-of-material-create.component';

describe('BillOfMaterialCreateComponent', () => {
  let component: BillOfMaterialCreateComponent;
  let fixture: ComponentFixture<BillOfMaterialCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillOfMaterialCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillOfMaterialCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
