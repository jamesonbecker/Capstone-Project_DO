import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartCreateComponent } from './part-create.component';

describe('PartCreateComponent', () => {
  let component: PartCreateComponent;
  let fixture: ComponentFixture<PartCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
