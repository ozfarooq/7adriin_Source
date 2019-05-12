import { HttpClient } from '@angular/common/http';

import { Http, Response, URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { Router, CanActivate, RouterModule, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SharedService } from '../services/shared.service';
import { LocalStorageService } from 'angular-2-local-storage';
declare const FB: any;
@Injectable()
export class ProjectService {
  private headers: Headers = new Headers();
  private headerOptions: RequestOptions = new RequestOptions();
  private headersIDX: Headers = new Headers();
  private headerOptionsIDX: RequestOptions = new RequestOptions();
  constructor(public sharedServiceObj: SharedService , private http: Http, private ngZone: NgZone,
    public localStorageService: LocalStorageService, private _routeParams: ActivatedRoute, private router: Router) {

    }
    createProject(dataObj: any) {
      let url = '';
      const data = new URLSearchParams();
      url = this.sharedServiceObj.apiBaseUrl + 'projects/createProject';
      data.append('project_title', dataObj.project_title);
      data.append('project_description_editor', dataObj.project_description_editor);
      data.append('selectedCategory', dataObj.selectedCategory);
      data.append('selectedSubCategory', dataObj.selectedSubCategory);
      data.append('allSelectedSkillsList', dataObj.allSelectedSkillsList);
      data.append('project_Image', '');
      //data.append('project_Image', dataObj.project_Image);
      data.append('project_Pdf', dataObj.project_Pdf);
      data.append('is_verified', dataObj.is_verified);
      data.append('member_id', dataObj.user_id);
      data.append('proj_budget', dataObj.proj_budget);
      debugger;
      const createProjStatus = this.http
        .post(url, data, this.headerOptions)
        .map(this.extractData);
      return createProjStatus;
    }
    private extractData(res: Response) {
      debugger;
        return res.json();
    }
      private handleErrorObservable(error: Response | any) {
        debugger;
        console.error(error.message || error);
        return Observable.throw(error.message || error);
      }
      private handleErrorPromise(error: Response | any) {
        console.error(error.message || error);
        return Promise.reject(error.message || error);
      }
}
