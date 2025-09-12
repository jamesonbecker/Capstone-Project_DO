import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartTabNavComponent } from './part-tab-nav.component';

describe('PartTabNavComponent', () => {
  let component: PartTabNavComponent;
  let fixture: ComponentFixture<PartTabNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartTabNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartTabNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
