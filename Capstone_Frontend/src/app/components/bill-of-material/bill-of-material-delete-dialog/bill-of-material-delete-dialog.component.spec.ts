import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BillOfMaterialDeleteDialogComponent } from './bill-of-material-delete-dialog.component';

describe('BillOfMaterialDeleteDialogComponent', () => {
  let component: BillOfMaterialDeleteDialogComponent;
  let fixture: ComponentFixture<BillOfMaterialDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BillOfMaterialDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BillOfMaterialDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
