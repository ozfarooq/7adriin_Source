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
declare const cbpHorizontalMenu: any;
declare const App: any;

@Component({
  selector: 'app-registeration-info',
  templateUrl: './registeration-info.component.html',
  styleUrls: ['./registeration-info.component.css']
})
export class RegisterationInfoComponent implements OnInit, AfterViewInit {
  public urlToUse= '';
  public userType= '';
  public userLoggedIn= false;
  public registerTab= '1';
  constructor(private pService: NgProgressService, private location: Location, private _routeParams: ActivatedRoute, private router: Router,
    private _DomSanitizationService: DomSanitizer, private localStorageService: LocalStorageService,
    private userServiceObj: UserService, private sharedServiceObj: SharedService,
    private url: LocationStrategy, private dialogService: DialogService) {
    }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this.loadOneApp();
  }
  loadOneApp() {
    //debugger;
    App.init();
  }
  setRegisterTab(registerationTab: string) {
this.registerTab = registerationTab;

  }
}
