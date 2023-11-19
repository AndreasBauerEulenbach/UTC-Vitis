import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UmlDiagramComponent } from './uml-diagram.component';

describe('UmlDiagramComponent', () => {
  let component: UmlDiagramComponent;
  let fixture: ComponentFixture<UmlDiagramComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UmlDiagramComponent]
    });
    fixture = TestBed.createComponent(UmlDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
