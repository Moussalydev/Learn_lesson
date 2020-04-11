import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutElevesComponent } from './ajout-eleves.component';

describe('AjoutElevesComponent', () => {
  let component: AjoutElevesComponent;
  let fixture: ComponentFixture<AjoutElevesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutElevesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutElevesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
