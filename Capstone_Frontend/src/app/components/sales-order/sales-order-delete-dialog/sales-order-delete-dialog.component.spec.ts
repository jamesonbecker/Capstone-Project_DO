import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderDeleteDialogComponent } from './sales-order-delete-dialog.component';

describe('SalesOrderDeleteDialogComponent', () => {
  let component: SalesOrderDeleteDialogComponent;
  let fixture: ComponentFixture<SalesOrderDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SalesOrderDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesOrderDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
