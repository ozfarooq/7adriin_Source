import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingNotificationsComponent } from './setting-notifications.component';

describe('SettingNotificationsComponent', () => {
  let component: SettingNotificationsComponent;
  let fixture: ComponentFixture<SettingNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingNotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
