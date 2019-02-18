import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterationInfoComponent } from './registeration-info.component';

describe('RegisterationInfoComponent', () => {
  let component: RegisterationInfoComponent;
  let fixture: ComponentFixture<RegisterationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
