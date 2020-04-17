import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModifiermatiereComponent } from './modifiermatiere.component';

describe('ModifiermatiereComponent', () => {
  let component: ModifiermatiereComponent;
  let fixture: ComponentFixture<ModifiermatiereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModifiermatiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModifiermatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
