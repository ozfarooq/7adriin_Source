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
  public removeHeaderModalEmitter: EventEmitter<String>;
  public apiBaseUrl = 'https://stagingapi.7adriin.com/api/';
  public defaultNoImage= 'assets/images/noImage.png';
  private headers: Headers= new Headers();
   private headerOptions: RequestOptions= new RequestOptions();
  constructor(private http: Http) {
this.searchListingEmitter = new EventEmitter();
this.isLoggedInEmitter = new EventEmitter();
this.removeHeaderModalEmitter = new EventEmitter();
this.headerOptions = new RequestOptions({ headers: this.headers });
  }
 public searchListing() {
     this.searchListingEmitter.emit('searchListing');
 }
 public setLoginStatus(loginStatus: boolean) {
     this.isLoggedInEmitter.emit(loginStatus);
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

