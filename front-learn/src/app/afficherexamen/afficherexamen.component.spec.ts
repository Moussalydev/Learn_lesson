import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherexamenComponent } from './afficherexamen.component';

describe('AfficherexamenComponent', () => {
  let component: AfficherexamenComponent;
  let fixture: ComponentFixture<AfficherexamenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherexamenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherexamenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
