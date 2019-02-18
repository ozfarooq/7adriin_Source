import { HttpClient } from '@angular/common/http';

import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SharedService } from '../services/shared.service';
import { LocalStorageService } from 'angular-2-local-storage';
declare const FB: any;
@Injectable()
export class UserService {
  public fbLoginDecision: EventEmitter<String>;
  private headers: Headers = new Headers();
  private headerOptions: RequestOptions = new RequestOptions();
  private headersIDX: Headers = new Headers();
  private headerOptionsIDX: RequestOptions = new RequestOptions();
  public fbLoginStatus: any;
  public facebookObject: any;
  public fbAuthResp: any;
  public isApp= false;
  private firbase_token_data= '';
  private device_name= 'Browser';
  constructor(public sharedServiceObj: SharedService , private http: Http, public localStorageService: LocalStorageService) { 
    this.fbLoginDecision = new EventEmitter();
    this.isApp = (!document.URL.startsWith('http'));
    if (!this.isApp) {
    /*FB.init({
      appId: '701598080041539',
      cookie: false,
      xfbml: true,
      version: 'v2.9',
      status: true
    });*/
    FB.init({
      appId: '2273499966196328',
      cookie: false,
      xfbml: true,
      version: 'v2.9',
      status: true
    });
    this.facebookObject = FB;
    this.facebookObject.getLoginStatus(response => {
      this.fbLoginStatus = response;

    }, true);
  }
  if (this.localStorageService.get('firebase_token') !== null) {
    this.firbase_token_data = this.localStorageService.get('firebase_token').toString();
  }
  }
  onFacebookLoginClick(): void {
     if (this.fbLoginStatus !== undefined) {
       this.statusChangeCallback(this.fbLoginStatus);
     }
   }
   statusChangeCallback(resp) {
     if (resp !== 0) {
       if (resp.status === 'connected') {
     if(!this.isApp) {
         this.facebookObject.api('/me', { locale: 'en_US', fields: 'name, email,picture' }, this.setFacebookAuthentication.bind(this));
         }
       } else if (resp.status === 'not_authorized') {
       } else {
           this.facebookObject.login(this.checkFacebookResp.bind(this));
       }
     } else {
        this.facebookObject.login(this.checkFacebookResp.bind(this));
     }
   }
   checkFacebookResp(resp: any) {
     if (resp.authResponse) {
       if ( !this.isApp) {
       this.facebookObject.api('/me', { locale: 'en_US', fields: 'name, email,picture' }, this.setFacebookAuthentication.bind(this));
       }
     }
   }
   setFacebookAuthentication(response: any): void {
     if (response.email) {
       this.localStorageService.set('fbAuthResp', response);
      this.fbEmailCheck(response.email).subscribe(result => this.checkFbEmail(result));
     } else {
     }
   }
   checkFbEmail(resp: any): void {

     const fbAuthResp = this.localStorageService.get('fbAuthResp');
     if (fbAuthResp != null) {
      this.fbAuthResp = fbAuthResp;
      if (resp.status === true) {

        this.fbSetAuthenticationValues(resp);
        this.fbUpdateToken(this.fbAuthResp.email, this.fbAuthResp.id)
          .subscribe(result => this.fbUpdateTokenResp(result));
      } else {
        this.localStorageService.set('fbMembershipResp', this.fbAuthResp);
        this.openFBConfirmModal();
      }
    }
   }
   fbUpdateTokenResp(result: any): void {
   }
   fbSetAuthenticationValues(result: any): void {
     if (result.status === true) {
       if (result.memberCredentials.verified === '1') {
         this.localStorageService.set('loggedId', '1');
         this.localStorageService.set('userId', result.memberCredentials.id);
         this.localStorageService.set('email', result.memberCredentials.email);
         this.localStorageService.set('first_name', result.memberCredentials.first_name);
         this.localStorageService.set('last_name', result.memberCredentials.last_name);
         this.localStorageService.set('loggedInUserInfo', result);
         this.localStorageService.set('globalSettings',result.globalSettings);
         this.sharedServiceObj.setLoginStatus(true);
         this.fbLoginDecision.emit('1');
       }
     }
   }
   openFBConfirmModal() {
     this.fbLoginDecision.emit('0');
   }
   userLogin(email: string, password: string) {
    // debugger;
     let url = '';
     url = this.sharedServiceObj.apiBaseUrl + 'members/memberLogin';
     const data = new URLSearchParams();
     data.append('email', email);
     data.append('password', password);
    // data.append('firebase_token', this.firbase_token_data);
    // data.append('device_name', this.device_name);
     const loggedInStatus = this.http
       .post(url, data, this.headerOptions)
       .map(this.extractData);
     return loggedInStatus;
   }
   userSignUp(dataObj: any) {
     let url = '';
     const data = new URLSearchParams();
     url = this.sharedServiceObj.apiBaseUrl + 'members/memberSignup';
     data.append('email', dataObj.email);
     data.append('password', dataObj.password);
     data.append('userName', dataObj.userName);
     data.append('phone_mobile', dataObj.phone_number.toString());
     data.append('fb_token', dataObj.fb_token);
     data.append('verified', dataObj.verified);
     const signUpStatus = this.http
       .post(url, data, this.headerOptions)
       .map(this.extractData);
     return signUpStatus;
   }
   getMemberInfo(member_id: string) {
     let url = '';
     const data = new URLSearchParams();
     url = this.sharedServiceObj.apiBaseUrl + 'members/generalinfo';
     data.append('member_id', member_id);
     const memberInfo = this.http
       .post(url, data, this.headerOptions)
       .map(this.extractData);
     return memberInfo;
   }
   getUserAdditionalInfo(master_id: string) {
     let url = '';
     const data = new URLSearchParams();
     url = this.sharedServiceObj.apiBaseUrl + 'members/getAdditionalInfo';
     data.append('master_id', master_id);
     const signUpAdditionalInfo = this.http
       .post(url, data, this.headerOptions)
       .map(this.extractData);
     return signUpAdditionalInfo;
   }
   sendVerificationInfo(json_data: any , service_id= '') {
     const data = new URLSearchParams();
     data.append('master_id', json_data.master_id);
     data.append('verify_by', json_data.verify_by);
     data.append('service_id', service_id);
     if (json_data.verify_by === 'phone') {
       data.append('phone_mobile', json_data.phone_number_verify);
       data.append('country_code', json_data.country_code);
       data.append('country_abbv', json_data.country_abbv);
     }
     const verificationInfogResp = this.http
       .post(this.sharedServiceObj.apiBaseUrl + 'members/verifyInfo', data,
       this.headerOptions)
       .map(this.extractData);
     return verificationInfogResp;
   }
   confirmVerificationCode(verification_code: string) {
     debugger;
     const data = new URLSearchParams();
     data.append('verification_code', verification_code);
     const verificationInfogResp = this.http
       .post(this.sharedServiceObj.apiBaseUrl + 'members/confirmVerification', data,
       this.headerOptions)
       .map(this.extractData);
     return verificationInfogResp;
   }
   fbEmailCheck(email: string) {
     const data = new URLSearchParams();
     data.append('email', email);
     const searchedListing = this.http
       .post(this.sharedServiceObj.apiBaseUrl + 'members/fbEmailCheck', data,
       this.headerOptions)
       .map(this.extractData);
     return searchedListing;
   }
   fbUpdateToken(email: string, fb_token: string) {
    const data = new URLSearchParams();
     data.append('email', email);
     data.append('fb_token', fb_token);
     const searchedListing = this.http
       .post(this.sharedServiceObj.apiBaseUrl + 'members/fbTokenUpdate', data,
       this.headerOptions)
       .map(this.extractData);
     return searchedListing;
   }
   userInfo(user_id: string) {
    const data = new URLSearchParams();
     data.append('member_id', user_id);
     const acountInfoResp = this.http
       .post(this.sharedServiceObj.apiBaseUrl + 'members/generalinfo', data,
       this.headerOptions)
       .map(this.extractData);
     return acountInfoResp;
   }
   updateAccount(user_id: string, dataObj: any) {
     // debugger;
     const data = new URLSearchParams();
     if (dataObj.email !== '') {
       data.append('email', dataObj.email);
     }
     if (dataObj.password !== '') {
       data.append('password', dataObj.password);
     }
     if (dataObj.first_name !== '') {
       data.append('first_name', dataObj.first_name);
     }
     if (dataObj.last_name !== '') {
       data.append('last_name', dataObj.last_name);
     }
     if (dataObj.description !== '') {
       data.append('description', dataObj.description);
     }
     if (dataObj.company !== '') {
       data.append('company', dataObj.company);
     }
     if (dataObj.phone_number !== '') {
       data.append('phone_mobile', dataObj.phone_number);
     }
     if (dataObj.country_code !== '') {
       data.append('country_code', dataObj.country_code);
     }
     if (dataObj.country_abbv !== '') {
       data.append('country_abbv', dataObj.country_abbv);
     }
     if (dataObj.mls_server_id !== '') {
       data.append('mls_server_id', dataObj.mls_server_id);
     }
   if (dataObj.photo_personal !== '') {
     data.append('photo_personal', dataObj.photo_personal);
    }
     data.append('member_id', user_id);
     const accountUpdatingResp = this.http
       .post(this.sharedServiceObj.apiBaseUrl + 'members/updateAccountInfo', data,
       this.headerOptions)
       .map(this.extractData);
     return accountUpdatingResp;
   }
   loadCountryCodes() {
     const data = new URLSearchParams();
     const countryCodesResp = this.http
       .post(this.sharedServiceObj.apiBaseUrl + 'members/countryphonecodes', data,
       this.headerOptions)
       .map(this.extractData);
     return countryCodesResp;
   }
   sendContactUsEmail(reason: string, firstName: string, lastName: string, phoneNumber: number, emailAddress: string,
     message: string, service_id: string, captchaResp: string) {
    const data = new URLSearchParams();
     data.append('firstName', firstName);
     data.append('lastName', lastName);
     data.append('emailAddress', emailAddress);
     data.append('phoneNumber', phoneNumber.toString());
     data.append('message', message);
     data.append('reason', reason);
     data.append('service_id', service_id);
     data.append('g-recaptcha-response', captchaResp);
     const contactUsResp = this.http
       .post(this.sharedServiceObj.apiBaseUrl + 'General/contactForm', data,
       this.headerOptions)
       .map(this.extractData);
     return contactUsResp;
   }
 loadAllRoles(member_id: string, service_id: string) {
  const data = new URLSearchParams();
   data.append('service_id', service_id);
   data.append('member_id', member_id);
   const roleResp = this.http
      .post(this.sharedServiceObj.apiBaseUrl + 'members/allRoles', data, this.headerOptions)
      .map(this.extractData)
      return roleResp;
 }
 deleteRole(role_id: string) {
   const data = new URLSearchParams();
   data.append('role_id', role_id);
   const roleResp = this.http
      .post(this.sharedServiceObj.apiBaseUrl + 'members/deleteRole', data, this.headerOptions)
      .map(this.extractData);
      return roleResp;
 }
 loadAllAccessLevels(service_id: string) {
  const data = new URLSearchParams();
   data.append('service_id', service_id);
   const roleResp = this.http
      .post(this.sharedServiceObj.apiBaseUrl + 'members/allAccessLevels', data, this.headerOptions)
      .map(this.extractData);
      return roleResp;
 }
 createRole(access_level: any, user_id: string, name: string, service_id: string) {
  const data = new URLSearchParams();
   data.append('access_level', access_level);
   data.append('member_id', user_id);
   data.append('service_id', service_id);
   data.append('name', name);
  // debugger;
  const roleResp = this.http
      .post(this.sharedServiceObj.apiBaseUrl + 'members/createRole', data, this.headerOptions)
      .map(this.extractData);
      return roleResp;
 }
 updateRole(access_level: any, role_id: string, name: string) {
  const data = new URLSearchParams();
   data.append('access_level', access_level);
   data.append('role_id', role_id);
   data.append('name', name);
  // debugger;
  const roleResp = this.http
      .post(this.sharedServiceObj.apiBaseUrl + 'members/updateRole', data, this.headerOptions)
      .map(this.extractData);
      return roleResp;
 }
 roleDetail(role_id: string) {
  const data = new URLSearchParams();
   data.append('role_id', role_id);
   const roleResp = this.http
      .post(this.sharedServiceObj.apiBaseUrl + 'members/roleDetail', data, this.headerOptions)
      .map(this.extractData);
      return roleResp;
 }
 getAllMemberAllowedOptions(allowedOptions) {
   const data = new URLSearchParams();
     data.append('allowedOptions', allowedOptions);
    const allowedOptionsResp = this.http
        .post(this.sharedServiceObj.apiBaseUrl + 'members/memberAllowedOptions', data, this.headerOptions)
        .map(this.extractData);
        return allowedOptionsResp;
 }
 private extractData(res: Response) {
   //debugger;
     return res.json();
 }
   private handleErrorObservable(error: Response | any) {
     //debugger;
     console.error(error.message || error);
     return Observable.throw(error.message || error);
   }
   private handleErrorPromise(error: Response | any) {
     console.error(error.message || error);
     return Promise.reject(error.message || error);
   }

}
