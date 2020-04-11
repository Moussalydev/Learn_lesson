import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutSubjectComponent } from './ajout-subject.component';

describe('AjoutSubjectComponent', () => {
  let component: AjoutSubjectComponent;
  let fixture: ComponentFixture<AjoutSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
