import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartInventoryComponent } from './part-inventory.component';

describe('PartInventoryComponent', () => {
  let component: PartInventoryComponent;
  let fixture: ComponentFixture<PartInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartInventoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
