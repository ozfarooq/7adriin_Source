import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, ViewContainerRef,
  ComponentFactoryResolver, Renderer, EventEmitter, NgZone  } from '@angular/core';
import {ViewEncapsulation} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { LocationStrategy, Location } from '@angular/common';
import {DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl} from '@angular/platform-browser';
import { Router, CanActivate, RouterModule, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
//import {LocalStorageService} from 'ngx-localstorage';
import {NgProgressService} from 'ng2-progressbar';
import { DialogService } from 'ng2-bootstrap-modal';
//import { NotificationService } from 'ng2-notify-popup';
import { NotifierService } from 'angular-notifier';
import { SimpleSearchComponent } from '../simple-search/simple-search.component';

import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';
declare const gapi: any;
declare const FB: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  @ViewChild('btnGoogle', { read: ElementRef }) btnGoogle: ElementRef;
  btnGoogleElement: HTMLElement = null;
  public email = ''; public emailFb = ''; public password = ''; public fbPassword = ''; public userName = '';
  public first_name = ''; public first_name_fb = ''; public last_name = ''; public last_name_fb = '';
  public phone_number: number; public phone_number_verify: number; public userLogginMsg = '';
  public verificationMsg = ''; public userSignUpMsg = ''; public userFbSignUpMsg = '';
  public userCreated = false; public userTypeSelected = true; public userType = '1';
  public domainAccess: any; public userLoggedId= false; public fbAuthResp: any; public fbSignUp= false;
  public acctVerified= false; public fb_token_id = ''; public selectedCountryCode = ''; public selectedCountryAbbv = '';
  public verification_code = ''; public urlToUse = ''; public title: string; public message: string;
  public fbLoginStatus: any; public appId = 2273499966196328; public websiteBackgroundInfo: any;
  public loader: any; public loadedWebsite = ''; public serviceType = '';
  public google_token= ''; public google_id= ''; public google_name= ''; public google_image= ''; public google_email= '';
  private readonly notify: NotifierService;
  private clientId = this.sharedServiceObj.google_client_id;
  private scope = [
    'profile',
    'email',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/admin.directory.user.readonly'
  ].join(' ');

  public auth2: any;
  constructor(private pService: NgProgressService, private location: Location, private _routeParams: ActivatedRoute, private router: Router,
    private _DomSanitizationService: DomSanitizer, private localStorageService: LocalStorageService,
    private userServiceObj: UserService, private sharedServiceObj: SharedService, private ngZone: NgZone,
    private url: LocationStrategy, private dialogService: DialogService, private notifierService: NotifierService) {
      this.notify = notifierService;
      userServiceObj.fbLoginDecision.subscribe(item => this.faceBookDecisionMethod(item));
    this._routeParams.params.subscribe(params => {
      if (params['type'] !== undefined) {
        this.userType = params['type'];
      }
  });
    }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.btnGoogleElement = this.btnGoogle.nativeElement;
    this.localStorageService.set('userType', this.userType);
    debugger;
    this.googleInit();
  }
  public googleInit() {
    const that = this;
    gapi.load('auth2', function () {
      that.auth2 = gapi.auth2.init({
        client_id: that.clientId,
        cookiepolicy: 'single_host_origin',
        scope: that.scope
      });
      that.attachSignin(that.btnGoogleElement);
    });
  }
  public attachSignin(element) {
    const that = this;
    this.auth2.attachClickHandler(element, {},
      function (googleUser) {

        const profile = googleUser.getBasicProfile();
        that.google_token = googleUser.getAuthResponse().id_token;
        that.google_id = profile.getId();
        that.google_name = profile.getName();
        that.google_image = profile.getImageUrl();
        that.google_email = profile.getEmail();
        const dataObj = {
          google_token : that.google_token,
          google_id : that.google_id,
          google_name : that.google_name,
          google_image : that.google_image,
          google_email : that.google_email
        };
        that.localStorageService.set('googleAuth', dataObj);
        that.userServiceObj.googleSignUp();
      }, function (error) {
        console.log(JSON.stringify(error, undefined, 2));
      });
  }
  faceBookDecisionMethod(opt: string) {
    if (opt === '0') {
      this.ngZone.run(() => {
      this.router.navigate(['FbConfirmPage']);
      });
    } else if (opt === '1') {
      this.ngZone.run(() => {
      this.router.navigate(['dashboard']);
      });
    }
  }
  setUserType(userTypeSelected: string) {
this.userType = userTypeSelected;
//debugger;
  }
  userSignUp(): void {
    const dataObj = {
      userName: '',
      first_name: '',
      last_name: '',
      full_name: '',
      country_code: '',
      country_abbv: '',
      phone_number: 123,
      email: '',
      password: '',
      userType: '1',
      fb_token: '',
      google_token: '',
      verified: 0
    };
    if (this.fbSignUp) {
      dataObj.userName = this.userName;
      dataObj.email = this.emailFb;
      dataObj.password = this.fbPassword;
      dataObj.fb_token = this.fb_token_id;
      dataObj.google_token = '';
      dataObj.phone_number = Math.floor(Math.random() * (90000000 - 1 + 1)) + 1;
      dataObj.verified = 0;
    } else {
      dataObj.userName = this.userName;
      dataObj.email = this.email;
      dataObj.password = this.password;
      dataObj.fb_token = '';
      dataObj.google_token = '';
      dataObj.phone_number = Math.floor(Math.random() * (90000000 - 1 + 1)) + 1;
      dataObj.verified = 0;
    }
    dataObj.userType = this.userType;
          this.userServiceObj.userSignUp(dataObj)
          .subscribe((result) => this.userSignUpResponse(result));
  }

  userSignUpResponse(result: any): void {
    if (result.status === true) {
      this.userCreated = true;
      this.userTypeSelected = true;
      this.userSignUpMsg = 'User has been successfully registered. Please check your Email for verification link.';

      if (!this.fbSignUp) {
        this.notify.notify( 'success', this.userSignUpMsg.toUpperCase() );
        this.ngZone.run(() => {
        this.router.navigate(['verify']);
        });
      }
    } else {
      this.userCreated = true;
      this.userSignUpMsg = result.message.toUpperCase();
      this.notify.notify( 'error', this.userSignUpMsg.toUpperCase() );
    }

  }
forgetPassword() {

  }
userSignIn() {
  this.ngZone.run(() => {
    this.router.navigate(['login']);
  });
  }
  onFacebookLoginClick(): void {
    this.userServiceObj.onFacebookLoginClick();
  }
}
