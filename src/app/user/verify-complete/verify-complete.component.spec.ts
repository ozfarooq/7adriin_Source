import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyCompleteComponent } from './verify-complete.component';

describe('VerifyCompleteComponent', () => {
  let component: VerifyCompleteComponent;
  let fixture: ComponentFixture<VerifyCompleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifyCompleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
