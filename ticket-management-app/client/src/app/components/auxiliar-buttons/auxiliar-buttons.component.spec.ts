import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuxiliarButtonsComponent } from './auxiliar-buttons.component';

describe('AuxiliarButtonsComponent', () => {
  let component: AuxiliarButtonsComponent;
  let fixture: ComponentFixture<AuxiliarButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuxiliarButtonsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuxiliarButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
