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
import { SimpleSearchComponent } from '../simple-search/simple-search.component';

import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';

declare const FB: any;
@Component({
  selector: 'app-left-profile',
  templateUrl: './left-profile.component.html',
  styleUrls: ['./left-profile.component.css']
})
export class LeftProfileComponent implements OnInit {
  public userType= '';
  public userId= '';
  public loggedInUserInfo: any;
  constructor(private pService: NgProgressService, private location: Location, private _routeParams: ActivatedRoute, private router: Router,
    private _DomSanitizationService: DomSanitizer, private localStorageService: LocalStorageService,
    private userServiceObj: UserService, public sharedServiceObj: SharedService,
    private url: LocationStrategy, private dialogService: DialogService, private ngZone: NgZone) { }

  ngOnInit() {
    if (this.localStorageService.get('userType') === '1') {
      this.userType = '1';
      }else if (this.localStorageService.get('userType') === '0') {
      this.userType = '0';
      }
      if (this.localStorageService.get('userId')) {
        this.userId = this.localStorageService.get('userId').toString();
      }
      if (this.localStorageService.get('loggedInUserInfo')) {
        this.loggedInUserInfo = this.localStorageService.get('loggedInUserInfo');
      }
      //debugger;
  }
createProject() {
  this.ngZone.run(() => {
  this.router.navigate(['create-project']);
  });
}
}
