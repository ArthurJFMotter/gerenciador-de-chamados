import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueueTabsComponent } from './queue-tabs.component';

describe('QueueTabsComponent', () => {
  let component: QueueTabsComponent;
  let fixture: ComponentFixture<QueueTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QueueTabsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QueueTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
