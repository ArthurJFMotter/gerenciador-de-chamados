import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArchivedComponent } from './view-archived.component';

describe('ViewArchivedComponent', () => {
  let component: ViewArchivedComponent;
  let fixture: ComponentFixture<ViewArchivedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewArchivedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewArchivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
