import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTodosComponent } from './my-todos.component';

describe('MyTodosComponent', () => {
  let component: MyTodosComponent;
  let fixture: ComponentFixture<MyTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
