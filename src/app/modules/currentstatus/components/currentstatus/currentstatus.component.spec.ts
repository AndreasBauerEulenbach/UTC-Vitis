import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CurrentstatusComponent} from './currentstatus.component';

describe('CurrentstatusComponent', () => {
  let component: CurrentstatusComponent;
  let fixture: ComponentFixture<CurrentstatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentstatusComponent]
    });
    fixture = TestBed.createComponent(CurrentstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
