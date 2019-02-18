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
import { SimpleSearchComponent } from '../simple-search/simple-search.component';

import { SharedService } from '../../services/shared.service';
import { UserService } from '../../services/user.service';

declare const FB: any;
declare const cbpHorizontalMenu: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  public urlToUse= '';
  public userType= '';
  public userLoggedIn= false;
  constructor(private pService: NgProgressService, private location: Location, private _routeParams: ActivatedRoute, private router: Router,
    private _DomSanitizationService: DomSanitizer, private localStorageService: LocalStorageService,
    private userServiceObj: UserService, private sharedServiceObj: SharedService,
    private url: LocationStrategy, private dialogService: DialogService) {
      sharedServiceObj.isLoggedInEmitter.subscribe(item => this.setLoginStatus(item));
    }

  ngOnInit() {
    this.setLoginInitialStatus();
    }
    ngAfterViewInit() {
    this.loadHeaderSubMenu();
  }
  loadHeaderSubMenu() {
    cbpHorizontalMenu.init();
  }
  searchProject() {
    this.router.navigate(['project-listing']);
  }
  registerUser(type: string) {
    this.router.navigate(['register']);
  }
  setLoginStatus(item: any): void {
    //debugger;
    this.userLoggedIn = item;
    }
    setLoginInitialStatus(): void {
      this.urlToUse = this.url.path().split('/')[1];
      if (this.localStorageService.get('loggedInUserInfo')) {
    this.userLoggedIn = true;
    if (this.localStorageService.get('userType') === '1') {
    this.userType = '1';
    }else if (this.localStorageService.get('userType') === '0') {
    this.userType = '0';
    }
    if (this.urlToUse === 'home') {
    this.router.navigate(['admin']);
    }
      }else {
    this.userLoggedIn = false;
      }
    }
    userLoggout(): void {
       this.localStorageService.remove('userId');
       this.localStorageService.remove('email');
       this.localStorageService.remove('first_name');
       this.localStorageService.remove('last_name');
       this.localStorageService.remove('userType');
       this.localStorageService.remove('loggedInUserInfo');
       this.localStorageService.remove('fbAuthResp');
       this.userLoggedIn = false;
       this.sharedServiceObj.setLoginStatus(false);
       FB.getLoginStatus(response => {
                 this.logOutFaceBook(response);
             });
       this.router.navigate(['home']);
     }
     logOutFaceBook(resp) {
             if (resp.status === 'connected') {
              FB.logout();
             }else if (resp.status === 'not_authorized') {
                // debugger;
             }else {
             }
         }
}
