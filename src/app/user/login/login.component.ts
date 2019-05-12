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
declare const FB: any;
declare const gapi: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('btnGoogle', { read: ElementRef }) btnGoogle: ElementRef;
  btnGoogleElement: HTMLElement = null;
  public email = ''; public emailFb = ''; public password = ''; public fbPassword = ''; public first_name = '';
  public first_name_fb = ''; public last_name = ''; public last_name_fb = ''; public phone_number: number;
  public phone_number_verify: number; public userLogginMsg = ''; public verificationMsg = ''; public userLoggedId = false;
  public fbAuthResp: any; public acctVerified = false; public fb_token_id = ''; public selectedCountry = '';
  public selectedCountryResidence = ''; public allCountryCodes: any[] = []; public verify_by = 'email';
  public master_id = ''; public verification_code = ''; public loader: any; public fbLoginStatus: any;
  public appId = 2273499966196328; public websiteBackgroundInfo: any; public chkRememberMe = false;
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
    }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.btnGoogleElement = this.btnGoogle.nativeElement;
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
userLogin(): void {
  this.userServiceObj.userLogin(this.email, this.password)
    .subscribe((result) => this.userLoginResponse(result));
}
userLoginResponse(result: any): void {
  if (result.status === true) {
    if (result.memberCredentials) {

      if (result.memberCredentials.verified === '1') {
        this.localStorageService.set('rememberMe', this.chkRememberMe.toString());
        this.localStorageService.set('loggedId', '1');
        this.localStorageService.set('email', result.memberCredentials.email);
        this.localStorageService.set('first_name', result.memberCredentials.first_name);
        this.localStorageService.set('last_name', result.memberCredentials.last_name);
        this.localStorageService.set('userType', result.memberCredentials.user_type);
        this.localStorageService.set('country', result.memberCredentials.country);
        this.localStorageService.set('country_residence', result.memberCredentials.country_residence);
        this.localStorageService.set('userId', result.memberCredentials.id);
        this.localStorageService.set('parent_id', result.memberCredentials.parent_id);
        this.localStorageService.set('image_url', result.memberCredentials.image_url);
        this.localStorageService.set('loggedInUserInfo', result);
        this.userLoggedId = true;
        this.sharedServiceObj.setLoginStatus(true);
        this.ngZone.run(() => {
        this.router.navigate(['dashboard']);
        });
      }  else if (result.memberCredentials.verified === '0') {
        this.selectedCountry = result.memberCredentials.country;
        this.selectedCountryResidence = result.memberCredentials.country_residence;
        this.phone_number_verify = result.memberCredentials.phone_mobile;
        this.master_id = result.memberCredentials.master_id;
        this.notify.notify( 'error', 'YOUR ACCOUNT HAS NOT BEEN VERIFIED.' );
        this.ngZone.run(() => {
        this.router.navigate(['verify']);
        });
      }
    }
  } else {
    this.email = '';
    this.password = '';
    this.userLogginMsg = result.message;

    this.localStorageService.remove('userType');
    this.localStorageService.remove('loggedInUserInfo');
    this.userLoggedId = false;
    this.notify.notify( 'error', result.message.toUpperCase() );
  }

}
onFacebookLoginClick(): void {
  //
  //debugger;
  this.userServiceObj.onFacebookLoginClick();
}
}
