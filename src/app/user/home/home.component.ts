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
declare const adriin: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public allCategoryList: any;
  constructor(private pService: NgProgressService, private location: Location, private _routeParams: ActivatedRoute, private router: Router,
    private _DomSanitizationService: DomSanitizer, private localStorageService: LocalStorageService,
    private userServiceObj: UserService, private sharedServiceObj: SharedService,
    private url: LocationStrategy, private dialogService: DialogService, private ngZone: NgZone) { }

  ngOnInit() {
    this.loadAllCategories();
    if (this.localStorageService.get('loggedId') !== null) {
      const loggedIn = this.localStorageService.get('loggedId').toString();
      this.ngZone.run(() => {
      this.router.navigate(['dashboard']);
      });
    }
  }
  ngAfterViewInit() {
    //this.runCarosel();
    //debugger;
  }
  loadAllCategories() {
    //debugger;
    if (this.localStorageService.get('categoryList') !== null) {
    this.allCategoryList = this.localStorageService.get('categoryList');
    }
  }
  categoryListing(catId: string) {
    this.ngZone.run(() => {
      this.router.navigate(['project-listing', {catId: catId}]);
      });
  }
  allCategories() {
    this.ngZone.run(() => {
    this.router.navigate(['categories']);
    });
  }
  runCarosel() {
    //debugger;
    adriin.carousel();
  }
}
