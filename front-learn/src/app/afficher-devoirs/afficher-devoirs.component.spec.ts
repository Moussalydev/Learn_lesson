import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AfficherDevoirsComponent } from './afficher-devoirs.component';

describe('AfficherDevoirsComponent', () => {
  let component: AfficherDevoirsComponent;
  let fixture: ComponentFixture<AfficherDevoirsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AfficherDevoirsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AfficherDevoirsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
