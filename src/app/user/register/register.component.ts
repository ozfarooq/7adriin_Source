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
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [NotificationService]
})
export class RegisterComponent implements OnInit {
  public email = '';
  public emailFb = '';
  public password = '';
  public fbPassword = '';
  public userName = '';
  public first_name = '';
  public first_name_fb = '';
  public last_name = '';
  public last_name_fb = '';
  public phone_number: number;
  public phone_number_verify: number;
  public userLogginMsg = '';
  public verificationMsg = '';
  public userSignUpMsg = '';
  public userFbSignUpMsg = '';
  public userCreated = false;
  public userTypeSelected = true;
  public userType = '0';
  public domainAccess: any;
  public userLoggedId= false;
  public fbAuthResp: any;
  public fbSignUp= false;
  public acctVerified= false;
  public fb_token_id = '';
  public selectedCountryCode = '';
  public selectedCountryAbbv = '';
  public verification_code = '';
  public urlToUse = '';
  public title: string;
  public message: string;
  public fbLoginStatus: any;
  public appId = 2273499966196328;
  public websiteBackgroundInfo: any;
  public loader: any;
  public loadedWebsite = '';
  public serviceType = '';
  constructor(private pService: NgProgressService, private location: Location, private _routeParams: ActivatedRoute, private router: Router,
    private _DomSanitizationService: DomSanitizer, private localStorageService: LocalStorageService,
    private userServiceObj: UserService, private sharedServiceObj: SharedService,
    private url: LocationStrategy, private dialogService: DialogService, private notify: NotificationService) {
     /* this._routeParams.params.subscribe(params => {
        this.userType = params['userType'];
        //debugger;
    });*/
    }

  ngOnInit() {
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
      country_code: '',
      country_abbv: '',
      phone_number: 123,
      email: '',
      password: '',
      userType: '1',
      fb_token: '',
      verified: 0
    };
    if (this.fbSignUp) {
      dataObj.userName = this.userName;
      dataObj.email = this.emailFb;
      dataObj.password = this.fbPassword;
      dataObj.fb_token = this.fb_token_id;
      dataObj.phone_number = Math.floor(Math.random() * (90000000 - 1 + 1)) + 1;
      dataObj.verified = 0;
    } else {
      dataObj.userName = this.userName;
      dataObj.email = this.email;
      dataObj.password = this.password;
      dataObj.fb_token = '';
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
        // this.master_id = result.memberCredentials.master_id;
        this.notify.show( this.userSignUpMsg.toUpperCase(), { position: 'top', duration: '2000', type: 'success' });
        this.router.navigate(['verify']);
      }


    } else {
      this.userCreated = true;
      this.userSignUpMsg = result.message.toUpperCase();
      this.notify.show( result.message.toUpperCase(), { position: 'top', duration: '2000', type: 'error' });
      /*let alert = this.alertCtrl.create({
        title: 'Error',
        subTitle: this.userSignUpMsg,
        buttons: ['Ok']
      });
      alert.present();*/
      /*let toast = this.toastCtrl.create({
        message: this.userSignUpMsg,
        duration: 3000,
        position: 'top',
        cssClass:'errorToast'
      });
      toast.onDidDismiss(() => {
      });
      toast.present();*/
    }

  }
userSignIn() {
    this.router.navigate(['login']);
  }
  onFacebookLoginClick(): void {
    this.userServiceObj.onFacebookLoginClick();
  }
}
