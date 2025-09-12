import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillOfMaterialListComponent } from './bill-of-material-list.component';

describe('BillOfMaterialListComponent', () => {
  let component: BillOfMaterialListComponent;
  let fixture: ComponentFixture<BillOfMaterialListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillOfMaterialListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillOfMaterialListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
