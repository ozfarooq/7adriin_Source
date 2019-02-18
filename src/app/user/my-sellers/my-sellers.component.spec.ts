import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MySellersComponent } from './my-sellers.component';

describe('MySellersComponent', () => {
  let component: MySellersComponent;
  let fixture: ComponentFixture<MySellersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MySellersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MySellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
