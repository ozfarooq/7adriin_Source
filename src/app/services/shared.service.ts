import {EventEmitter, Injectable} from '@angular/core';
import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SharedService {
  public searchListingEmitter: EventEmitter<String>;
  public isLoggedInEmitter: EventEmitter<Boolean>;
  public languageEmitter: EventEmitter<String>;
  public removeHeaderModalEmitter: EventEmitter<String>;
  public apiBaseUrl = 'https://www.staginggafah.com/webapi/api/';
  //public apiBaseUrl = 'https://stagingapi.7adriin.com/api/';
  //public apiBaseUrl = 'http://localhost:1234/sevenAdriin/';
  public google_client_id = '559653155557-s6vihljjdj5bujb0tsidl1b4n9q7sfdf.apps.googleusercontent.com';
  public defaultNoImage= 'assets/images/noImage.png';
  public profileNoImage= 'assets/img/profile-photo.jpg';
  private headers: Headers= new Headers();
   private headerOptions: RequestOptions= new RequestOptions();
  constructor(private http: Http) {
this.searchListingEmitter = new EventEmitter();
this.isLoggedInEmitter = new EventEmitter();
this.removeHeaderModalEmitter = new EventEmitter();
this.languageEmitter = new EventEmitter();
this.headerOptions = new RequestOptions({ headers: this.headers });
  }
 public searchListing() {
     this.searchListingEmitter.emit('searchListing');
 }
 public setLoginStatus(loginStatus: boolean) {
     this.isLoggedInEmitter.emit(loginStatus);
 }
 public changeSelectedLanguage(selectedLanguage: string) {
  //debugger;
 this.languageEmitter.emit(selectedLanguage);
}
 public getAllCountries() {
  const data = new URLSearchParams();
  const countriesListResp = this.http
    .post(this.apiBaseUrl + 'members/getAllCountries', data,
    this.headerOptions)
    .map(this.extractData);
  return countriesListResp;
 }
  // this could also be a private method of the component class
private extractData(res: Response) {
return res.json();
    }
private handleErrorObservable (error: Response | any) {
  console.error(error.message || error);
return Observable.throw(error.message || error);
    }
    private handleErrorPromise (error: Response | any) {
console.error(error.message || error);
return Promise.reject(error.message || error);
    }
}

