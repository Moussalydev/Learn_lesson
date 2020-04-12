import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Bulletin2Component } from './bulletin2.component';

describe('Bulletin2Component', () => {
  let component: Bulletin2Component;
  let fixture: ComponentFixture<Bulletin2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Bulletin2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Bulletin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
