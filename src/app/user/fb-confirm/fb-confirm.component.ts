import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewContainerRef,
  ComponentFactoryResolver, Renderer, EventEmitter, NgZone  } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { LocationStrategy, Location } from '@angular/common';
import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';
import { Router, CanActivate, RouterModule, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import {NgProgressService} from 'ng2-progressbar';
import { DialogService } from 'ng2-bootstrap-modal';
import { NotifierService } from 'angular-notifier';
import { SimpleSearchComponent } from '../simple-search/simple-search.component';

import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';

declare const FB: any;

@Component({
  selector: 'app-fb-confirm',
  templateUrl: './fb-confirm.component.html',
  styleUrls: ['./fb-confirm.component.css']
})
export class FbConfirmComponent implements OnInit, AfterViewInit {
  public emailFb = '';
  public fbPassword = '';
  public first_name_fb = '';
  public last_name_fb = '';
  public full_name = '';
  public fb_token_id = '';
  public google_token = '';
  public master_id = '';
  public phone_number_verify: number;
  public selectedCountryCode = '1';
  public selectedCountryAbbv = 'US';
  public userCreated = false;
  public userFbSignUpMsg = '';
  public allCountryCodes: any[] = [];
  public userType = '1';
  public userSignUpMsg = '';
  public type = '';
  private readonly notify: NotifierService;
  constructor(private pService: NgProgressService, private location: Location, private _routeParams: ActivatedRoute, private router: Router,
    private _DomSanitizationService: DomSanitizer, private localStorageService: LocalStorageService,
    private userServiceObj: UserService, private sharedServiceObj: SharedService, private ngZone: NgZone,
    private url: LocationStrategy, private dialogService: DialogService, private notifierService: NotifierService) {
      this.notify = notifierService;
      this._routeParams.params.subscribe(params => {
        //debugger;
        this.type = params['type'];
    });
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    //debugger;
    if (this.type === '1') {
      this.setFacebookValues();
    } else if (this.type === '2') {
      this.setGoogleValues();
    }
    const userTypeSelected: any = this.localStorageService.get('userType');
    if (userTypeSelected != null) {
      debugger;
      this.userType = userTypeSelected;
    }
    //debugger;
  }
  setGoogleValues() {
    const googleAuth: any = this.localStorageService.get('googleAuth');
    if (googleAuth == null) {
    } else {
      this.emailFb = googleAuth.google_email;
      const fullname = googleAuth.google_name.split(' ');
      this.full_name = googleAuth.google_name;
      this.google_token = googleAuth.google_token;

      if (fullname[0] !== undefined) {
        this.first_name_fb = fullname[0];
      }
      if (fullname[1] !== undefined) {
        this.last_name_fb = fullname[1];
      }
    }
  }
  setUserType(userTypeSelected: string) {
    this.userType = userTypeSelected;
  }
  setFacebookValues() {
    const fbAuthResp: any = this.localStorageService.get('fbAuthResp');
      if (fbAuthResp == null) {
      } else {
        this.emailFb = fbAuthResp.email;
        this.full_name = fbAuthResp.name;
        this.fb_token_id = fbAuthResp.id;
          this.first_name_fb = fbAuthResp.first_name;
          this.last_name_fb = fbAuthResp.last_name;
      }
  }
  fbSignUpMethod(): void {

    this.userSignUp();
  }
  userSignUp(): void {
    const dataObj = {
      first_name: '',
      last_name: '',
      full_name: '',
      country_code: '',
      country_abbv: '',
      phone_number: 123,
      email: '',
      password: '',
      website_id: '',
      userType: '0',
      fb_token: '',
      google_token: '',
      verified: 1
    };
    dataObj.email = this.emailFb;
    dataObj.password = this.fbPassword;
    if ( this.type === '1') {
      dataObj.fb_token = this.fb_token_id;
    } else if ( this.type === '2') {
      dataObj.google_token = this.google_token;
    }
    dataObj.first_name = this.first_name_fb;
    dataObj.last_name = this.last_name_fb;
    dataObj.full_name = this.full_name;
    dataObj.userType = this.userType;
    dataObj.phone_number = Math.floor(Math.random() * (90000000 - 1 + 1)) + 1;
    dataObj.verified = 1;
    this.userServiceObj.userSignUp(dataObj)
      .subscribe((result) => this.userSignUpResponse(result));
  }
  userSignUpResponse(result: any): void {
    if (result.status === true) {
       this.userCreated = true;
      this.userSignUpMsg = 'User has been successfully registered.';

        this.notify.notify( 'success', this.userSignUpMsg.toUpperCase() );
        this.ngZone.run(() => {
        this.router.navigate(['login']);
        });
    } else {
      this.userCreated = true;
      this.userSignUpMsg = result.message.toUpperCase();
      this.notify.notify( 'error', this.userSignUpMsg.toUpperCase() );
    }
  }
}
