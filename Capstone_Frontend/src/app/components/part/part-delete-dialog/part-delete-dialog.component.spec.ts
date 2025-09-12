import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartDeleteDialogComponent } from './part-delete-dialog.component';

describe('PartDeleteDialogComponent', () => {
  let component: PartDeleteDialogComponent;
  let fixture: ComponentFixture<PartDeleteDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartDeleteDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartDeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
