import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetaileleveComponent } from './detaileleve.component';

describe('DetaileleveComponent', () => {
  let component: DetaileleveComponent;
  let fixture: ComponentFixture<DetaileleveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetaileleveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetaileleveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
