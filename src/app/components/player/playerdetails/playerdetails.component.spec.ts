import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerdetailsComponent } from './playerdetails.component';

describe('PlayerdetailsComponent', () => {
  let component: PlayerdetailsComponent;
  let fixture: ComponentFixture<PlayerdetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlayerdetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlayerdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
