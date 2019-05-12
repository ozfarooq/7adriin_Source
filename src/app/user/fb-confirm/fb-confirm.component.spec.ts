import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbConfirmComponent } from './fb-confirm.component';

describe('FbConfirmComponent', () => {
  let component: FbConfirmComponent;
  let fixture: ComponentFixture<FbConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
