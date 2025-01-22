import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewButtonsComponent } from './view-buttons.component';

describe('ViewButtonsComponent', () => {
  let component: ViewButtonsComponent;
  let fixture: ComponentFixture<ViewButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
