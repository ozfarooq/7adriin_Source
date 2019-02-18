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
import { NotificationService } from 'ng2-notify-popup';
import { SimpleSearchComponent } from '../simple-search/simple-search.component';

import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';
declare const FB: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [NotificationService]
})
export class LoginComponent implements OnInit {
  public email = '';
  public emailFb = '';
  public password = '';
  public fbPassword = '';
  public first_name = '';
  public first_name_fb = '';
  public last_name = '';
  public last_name_fb = '';
  public phone_number: number;
  public phone_number_verify: number;
  public userLogginMsg = '';
  public verificationMsg = '';

  public userLoggedId = false;
  public fbAuthResp: any;

  public acctVerified = false;
  public fb_token_id = '';
  public selectedCountry = '';
  public selectedCountryResidence = '';
  public allCountryCodes: any[] = [];
  public verify_by = 'email';
  public master_id = '';
  public verification_code = '';
  public loader: any;

  public fbLoginStatus: any;
  public appId = 2273499966196328;
  public websiteBackgroundInfo: any;
  public chkRememberMe = false;
  constructor(private pService: NgProgressService, private location: Location, private _routeParams: ActivatedRoute, private router: Router,
    private _DomSanitizationService: DomSanitizer, private localStorageService: LocalStorageService,
    private userServiceObj: UserService, private sharedServiceObj: SharedService,
    private url: LocationStrategy, private dialogService: DialogService, private notify: NotificationService) { }

  ngOnInit() {
  }
userLogin(): void {
  //debugger;
  this.userServiceObj.userLogin(this.email, this.password)
    .subscribe((result) => this.userLoginResponse(result));
}
userLoginResponse(result: any): void {
  //debugger;
  if (result.status === true) {
    if (result.memberCredentials) {

      if (result.memberCredentials.verified === '1') {
       // debugger;
        this.localStorageService.set('rememberMe', this.chkRememberMe);
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
        this.router.navigate(['dashboard']);
      }  else if (result.memberCredentials.verified === '0') {
        //debugger;
        this.selectedCountry = result.memberCredentials.country;
        this.selectedCountryResidence = result.memberCredentials.country_residence;
        this.phone_number_verify = result.memberCredentials.phone_mobile;
        this.master_id = result.memberCredentials.master_id;
        this.notify.show( 'YOUR ACCOUNT HAS NOT BEEN VERIFIED.', { position: 'top', duration: '2000', type: 'error' });
        this.router.navigate(['verify']);
      }
    }
  } else {
    //debugger;
    this.email = '';
    this.password = '';
    this.userLogginMsg = result.message;

    this.localStorageService.remove('userType');
    this.localStorageService.remove('loggedInUserInfo');
    this.userLoggedId = false;
    this.notify.show( result.message.toUpperCase(), { position: 'top', duration: '2000', type: 'error' });
  }

}
onFacebookLoginClick(): void {
  //
  this.userServiceObj.onFacebookLoginClick();
}
}
