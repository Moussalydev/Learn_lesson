import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditerEleveComponent } from './editer-eleve.component';

describe('EditerEleveComponent', () => {
  let component: EditerEleveComponent;
  let fixture: ComponentFixture<EditerEleveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditerEleveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditerEleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
